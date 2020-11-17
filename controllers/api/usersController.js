const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let secretOrKey = "subee team";
    if (email && password) {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ msg: "Không tìm thấy ngươi dùng nào" });
        }
        if (isValidPassword(user, password)) {
            let payload = { _id: user._id };
            let token = jwt.sign(payload, secretOrKey);
            res.json({ msg: "ok", token: token });
        } else {
            res.status(401).json({ msg: "Mật khẩu không đúng" });
        }
    }
};
// So sánh mật khẩu
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};
module.exports = {
    loginUser,
};