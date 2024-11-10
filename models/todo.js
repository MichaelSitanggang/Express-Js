import { sequelize, DataTypes } from "./model.js";
const Todo = sequelize.define('todo', {
    todo: DataTypes.STRING,
    deadline: DataTypes.STRING,
    id_user: DataTypes.STRING
});
(async() =>{
    await sequelize.sync();
})
export default Todo;