import express from "express";
import User from "./models/user.js";
import Todo from "./models/todo.js";
import Admin from "./models/admin.js";
import user_controller from "./controllers/user.js";
import admin_controller from "./controllers/admin.js";
import session from "express-session";

const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "ini adalah kode secret###",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);
app.set("view engine", "ejs");

app.get("/login", user_controller.login);
app.get("/logout", user_controller.logout);
app.post("/login", user_controller.auth);

// Route All
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/daftar", (req, res) => {
  res.render("register");
});
app.post("/register", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    nama: req.body.nama,
    no_telepon: req.body.no_telepon,
  }).then(res.redirect("/")).catch((err) => { res.json({ status: 502, error: err }) });
});

// Route Admin
app.get("/home", admin_controller, (req, res) => {
  User.findAll().then((results) => {
    res.render("admin/home", {
      users: results,
      admin: req.session.admin || "",
    });
  });
});
app.delete("/api/user/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 500, error: err, Response: {} });
    });
});

// Route User
app.get("/home", (req, res) => {
  // Get Only TODO with User ID Login
  Todo.findAll({ where: { id_user: req.session.user.id } }).then((results) => {
    res.render("user/home", { todo: results, user: req.session.user || "" });
  });
});

app.get("/create", (req, res) => {
  res.render("user/create");
});
app.get("/edit/:id", (req, res) => {
  Todo.findOne({ where: { id: req.params.id } }).then((results) => {
    res.render("user/edit", { todo: results });
  });
});

app.post("/api/todo", (req, res) => {
  Todo.create({ todo: req.body.todo, deadline: req.body.deadline, id_user: req.session.user.id })
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

app.put("/api/todo/:id", (req, res) => {
  Todo.update(
    { todo: req.body.todo, deadline: req.body.deadline },
    { where: { id: req.params.id } }
  )
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

app.delete("/api/todo/:id", (req, res) => {
  Todo.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 500, error: err, Response: {} });
    });
});
app.listen(port, () => {
  console.log(`Server Running`);
});
