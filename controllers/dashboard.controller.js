const User = require('../model/User');

const getDashboard = (req, res) => {
    res.render("dashboard", {
        title: "Trang quản trị",
        layout: "dashlayout",
        user: req.user.toJSON(),
    });
};

module.exports = {
    getDashboard,
};