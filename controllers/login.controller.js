const getLogin = (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/admin");
    res.render("signin", {
        title: "Đăng nhập",
        layout: "main",
        message: req.flash("message"),
    });
};

module.exports = {
    getLogin,
};
