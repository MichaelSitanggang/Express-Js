const admin_controller = (req, res, next) => {
    let user = req.session.user || ""
    let admin = req.session.admin || ""

    if (user)
        next('route')
    else if (admin)
        next()
    else
        res.send(`<br><br>
    <h1 style="text-align:center">NO ACCESS, PLEASE <a href="/login">LOGIN</a></h1>`)
}
export default admin_controller