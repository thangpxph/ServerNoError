const User = require("../../model/User");
const Category = require("../../model/Category");
const Table = require("../../model/Table");
const Time = require("../../model/Time");
const Dish = require("../../model/Dish");
const Book = require("../../model/Book");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const {phone, password} = req.body;
    let secretOrKey = "subee team";
    if (phone && password) {
        let users = await User.findOne({phone});
        if (!users) {
            res.status(401).json({msg: "1", token: "", permission: "", username: ""});
        }
        if (isValidPassword(users, password)) {
            let payload = {_id: users._id};
            let token = jwt.sign(payload, secretOrKey);
            res.json({ id: users._id, msg: "3", token: token, permission: users.permission, username: users.fullname});
        } else
            res.status(401).json({msg: "2", token: "", permission: "", username: ""});
    }
};
const signinUser = async (req, res) => {
    const {fullname, phone, password, permission} = req.body;
    console.log("jhsdbf", phone)
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
    if (!user) {
        res.status(401).json({msg: "1"});
    } else
        res.json({msg: "2", id: user._id});
}
const forgotPassword = async (req, res) => {
    const {id, password} = req.body;
    let user = await User.findByIdAndUpdate({_id: id},
        {
            password: createHash(password)
        },
        {
            new: true
        });
    if (user >= 0) {
        res.status(401).json({msg: "1"});
    } else
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
const getTable = async (req, res) => {
    console.log(req);
    try {
        let tableData = await Table.find().select("-__v");
        if (tableData) {
            return res.send(tableData);
        } else
            return res.status(200).json({status: false, msg: "1"});
    } catch (error) {
        return res.status(200).json({status: false, msg: "1"})
    }
};

const getTime = async (req, res) => {
    console.log(req);
    try {
        let timeData = await Time.find().select("-__v");
        if (timeData) {
            return res.send(timeData);
        } else
            return res.status(200).json({status: false, msg: "1"});
    } catch (error) {
        return res.status(200).json({status: false, msg: "1"})
    }
};
const getDish = async (req, res) => {
    try {
        let dishData = await Dish.find().select("-__v");
        if (dishData) {
            return res.send(dishData);
        } else
            return res.status(200).json({status: false, msg: "1"});
    } catch (error) {
        return res.status(200).json({status: false, msg: "1"});
    }
}
const getDishByCategory = async (req, res) => {
    const {idCategory} = req.body;
    try {
        let dishs = await Dish.find({category: idCategory}).lean();
        if (dishs) {
            return res.send(dishs);
        } else
            return res.status(200).json({status: false, msg: "1"});
    }catch (error) {
        return res.status(200).json({status: false, msg: "1"});
    }
}
const bookDish = async (req, res) => {
    const {iduser, people, idtime, listdist} = req.body;

    let obj = JSON.parse(listdist)
    let bookDish = new Book();
    bookDish.user = iduser;
    bookDish.people= people,
    bookDish.time = idtime;
    bookDish.dish = obj;

    let addBook = await bookDish.save((err) => {
        if (err) {
            res.json({msg: "1"});
            console.log(err.message);
            throw err;
        }
        //Trả về thông tin sau khi hoàn tất
        res.json({msg: "2", id: bookDish._id});
        console.log(bookDish)
    })
}

module.exports = {
    loginUser,
    signinUser,
    getCategory,
    getTable,
    getTime,
    getDish,
    comparisonPhone,
    forgotPassword,
    bookDish,
    getDishByCategory,
};