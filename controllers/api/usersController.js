const User = require("../../model/User");
const Category = require("../../model/Category");
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
            res.status(401).json({msg: "Mật khẩu không đúng"});
        }
    }
};
const signinUser = async (req, res) => {
    const {fullname, phone, password} = req.body;
    let user = await User.findOne({phone: phone})
    if (user) {
        res.status(401).json({msg: "1"});
    } else {
        let newUser = new User();
        newUser.fullname = fullname;
        newUser.phone = phone;
        newUser.password = createHash(password);
        let create = await newUser.save((err) => {
            if (err) {
                res.json({msg: "2"});
                console.log(err.message);
                throw err;
            }
            //Trả về thông tin sau khi hoàn tất
            res.json({msg: "3"});
        })
    }

};
// mã hóa mk
const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// So sánh mật khẩu
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};
const getCategory = async (req, res) => {
    console.log(req);
    try {
        let usersData = await Category.find().select("-__v");
        if (usersData) {
            return res.send(usersData);
        } else
            return res.status(200).json({status: false, msg: "Có lỗi xảy ra"});
    } catch (error) {
        return res.status(200).json({status: false, msg: "Có lỗi xảy ra"});
    }
};
module.exports = {
    loginUser,
    signinUser,
    getCategory,
};