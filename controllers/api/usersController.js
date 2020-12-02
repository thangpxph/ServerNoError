const User = require("../../model/User");
const Category = require("../../model/Category");
const Table = require("../../model/Table");
const Time = require("../../model/Time");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const {phone, password} = req.body;
    let secretOrKey = "subee team";
    if (phone && password) {
        let users = await User.findOne({phone});
        if (!users) {
            res.status(401).json({msg: "1"});
        }
        if (isValidPassword(users, password)) {
            let payload = {_id: users._id};
            let token = jwt.sign(payload, secretOrKey);
            res.json({msg: "3", token: token, permission: users.permission, username: users.fullname});
        }else
            res.status(401).json({msg: "2"});
    }
};
const signinUser = async (req, res) => {
    const {fullname, phone, password, permission} = req.body;
    let user = await User.findOne({phone: phone})
    if (user) {
        res.status(401).json({msg: "1"});
    } else {
        let newUser = new User();
        newUser.fullname = fullname;
        newUser.phone = phone;
        newUser.password = createHash(password);
        newUser.permission = permission;
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

const comparisonPhone = async (req, res) => {
    const {phone} = req.body;
    let user = await User.findOne({phone: phone});
    if (!user){
        res.status(401).json({msg: "1"});
    }else
        res.json({msg: "2"});
}
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
            return res.status(200).json({status: false, msg: "1"});
    } catch (error) {
        return res.status(200).json({status: false, msg: "1"});
    }
};
const getTable = async (req, res) =>{
    console.log(req);
    try {
        let tableData = await Table.find().select("-__v");
        if (tableData){
            return res.send(tableData);
        }else
            return res.status(200).json({status: false, msg: "1"});
    }catch (error){
        return res.status(200).json({status: false, msg:"1"})
    }
};

const getTime = async (req, res) =>{
    console.log(req);
    try {
        let timeData = await Time.find().select("-__v");
        if (timeData){
            return res.send(timeData);
        }else
            return res.status(200).json({status: false, msg: "1"});
    }catch (error){
        return res.status(200).json({status: false, msg:"1"})
    }
};

module.exports = {
    loginUser,
    signinUser,
    getCategory,
    getTable,
    getTime,
    comparisonPhone,
};