const getSignUp = (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/admin");
    res.render("signup", {
        title: "Đăng ký",
        layout: "main",
        message: req.flash("message"),
    });
};
module.exports = {
    getSignUp,
};