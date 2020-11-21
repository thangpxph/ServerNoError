const User = require('../model/User');
const Category = require('../model/Category');
const Dish = require('../model/Dish');

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
const getCategory = async (req, res) => {
    //lấy danh sách thể loại món ăn từ mongoose
    let categorys = await Category.find().lean();
    let newData = categorys.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    res.render("category", {
        title: "Quản lý thể loại món ăn",
        layout: "dashlayout",
        categoryList: newData,
    });
};
const createCategory = async (req, res) => {
    const {postId, title} = req.body;
    console.log(title)
    try {
        if (postId != "") {
            let updateData = await Category.findByIdAndUpdate(
                postId, {
                    nameCategory:title
                },
                {new: true}
            );
        } else {
            let createData = await Category.create({nameCategory:title});
        }
        res.redirect("/admin/category");
    } catch (error) {
        console.log(error.message);
    }
}

const getDish = async (req, res) => {
    let categorys = await Category.find().lean();
    let dishs = await Dish.find().lean();
    let newData = dishs.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    console.log(newData)
    res.render("dish", {
        title: "Quản lý món ăn",
        layout: "dashlayout",
        dishList: newData,
        categorys: categorys,

    });
};

const createDish = async (req, res) => {
    const { dishId, nameDish, price, time, ingredient, imageDish, category} = req.body;
    try {
        if (dishId != "") {
            let updateData = await Dish.findByIdAndUpdate(
                dishId,{
                    nameDish,
                    price,
                    time,
                    ingredient,
                    imageDish,
                    category
                },
                { new: true}
            );
        }else {
            let createData = await Dish.create({nameDish, price, time, ingredient, imageDish, category})
        }
        res.redirect("/admin/dish");
    }catch (error){
        console.log(error.message);
    }
};

module.exports = {
    getDashboard,
    getUserMananger,
    getCategory,
    createCategory,
    getDish,
    createDish,
};