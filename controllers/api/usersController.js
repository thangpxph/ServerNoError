const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const {phone, password} = req.body;
    let secretOrKey = "subee team";
    if (phone && password) {
        let user = await User.findOne({phone});
        if (!user) {
            res.status(401).json({msg: "Không tìm thấy ngươi dùng nào"});
        }
        if (isValidPassword(user, password)) {
            let payload = {_id: user._id};
            let token = jwt.sign(payload, secretOrKey);
            res.json({msg: "Thành công", token: token});
        } else {
            res.status(401).json({msg: "Mật khẩu không đúng"});
        }
    }
};
const signinUser = async (req, res) => {
    const {fullname, phone, password} = req.body;
        let user = await User.findOne({phone: phone})
        if (user) {
            res.status(401).json({msg: "Tài khoản đã tồn tại"});
        } else {
            let newUser = new User();
            newUser.fullname = fullname;
            newUser.phone = phone;
            newUser.password = password;
            let create = await newUser.save((err) => {
                if (err) {
                    console.log(err.message);
                    throw err;
                }
                //Trả về thông tin sau khi hoàn tất
                res.json({msg: "Thành công"});
            })
        }

};
// So sánh mật khẩu
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};
module.exports = {
    loginUser,
    signinUser,
};