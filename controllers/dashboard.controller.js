const User = require('../model/User');

const getDashboard = (req, res) => {
    res.render("dashboard", {
        title: "Trang quản trị",
        layout: "dashlayout",
        user: req.user.toJSON(),
    });
};
const getUserMananger = async (req, res) => {
    // Lấy thông tin người dùng từ mongodb.
    let users = await User.find()
        .select("-password") // Trả về tất cả thông tin trừ password sẽ không lấy
        .lean();
    let newData = users.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    res.render("users", {
        title: "Quản lý người dùng",
        layout: "dashlayout",
        userList: newData,
    });
};
module.exports = {
    getDashboard,
    getUserMananger,
};