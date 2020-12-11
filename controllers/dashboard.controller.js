const User = require('../model/User');
const Category = require('../model/Category');
const Dish = require('../model/Dish');
const Table = require('../model/Table');
const Time = require('../model/Time');
const Book = require('../model/Book');
const Notification = require('../model/Notification');
require('dotenv').config();
const cloudinary = require("../config/cloudinary");

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
    const {categoryId, title} = req.body;
    console.log(title)
    try {
        if (categoryId != "") {
            let updateData = await Category.findByIdAndUpdate(
                categoryId, {
                    nameCategory: title
                },
                {new: true}
            );
        } else {
            let createData = await Category.create({nameCategory: title});
        }
        res.redirect("/admin/category");
    } catch (error) {
        console.log(error.message);
    }
}

const getDish = async (req, res) => {
    let categorys = await Category.find().lean();
    let dishs = await Dish.find()
        .populate({path: "category", select: "nameCategory"})
        .lean();
    let newData = dishs.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    res.render("dish", {
        title: "Quản lý món ăn",
        layout: "dashlayout",
        dishList: newData,
        categorys: categorys,

    });
};

const createDish = async (req, res) => {
    const {dishId, nameDish, price, time, calories, weight, ingredient, category} = req.body;
    const image = req.file;
    console.log(image)

    try {
        if (dishId != "") {
            const result = await cloudinary.uploader.upload(image.path);
            let updateData = await Dish.findByIdAndUpdate(
                dishId, {
                    nameDish,
                    price,
                    time,
                    calories,
                    weight,
                    ingredient,
                    imageDish: result.secure_url,
                    category
                },
                {new: true}
            );
        } else {
            const result = await cloudinary.uploader.upload(image.path);
            let createData = await Dish.create({
                nameDish,
                price,
                time,
                calories,
                weight,
                ingredient,
                imageDish: result.secure_url,
                category
            })
        }
        res.redirect("/admin/dish");
    } catch (error) {
        console.log(error.message);
    }
};
const getTable = async (req, res) => {
    let tables = await Table.find()
        .select("-__v")
        .lean();
    let newData = tables.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    res.render("table", {
        title: "Quản lý bàn",
        layout: "dashlayout",
        tableList: newData,
    })
};
const createTable = async (req, res) => {
    const {tableId, nameTable, amount} = req.body;
    try {
        if (tableId !== "") {
            let updateData = await Table.findByIdAndUpdate(
                tableId, {
                    nameTable,
                    amount,
                    status: 1
                },
                {new: true}
            );
        } else {
            let createData = await Table.create({nameTable, amount, status: 1})
        }
        res.redirect("/admin/table");
    } catch (error) {
        console.log(error.message)
    }
};

const resetTime = async (req, res) => {
    const {resetTime} = req.body;
    console.log(resetTime)
    let times = await Time.updateMany({slot: resetTime});
    res.redirect("/admin/time");
}

const getTime = async (req, res) => {
    let times = await Time.find()
        .select("-__v")
        .lean();
    let newData = times.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    res.render("time", {
        title: "Quản lý khung giờ",
        layout: "dashlayout",
        timeList: newData,
    })
};
const getNotification = async (req, res) => {
    let notifications = await Notification.find()
        .select("-__v")
        .lean();
    let newData = notifications.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    res.render("notification", {
        title: "Quản lý thông báo",
        layout: "dashlayout",
        notificationLish:newData,
    })
};
const createTime = async (req, res) => {
    const {timeId, startingTime, endTime, slot} = req.body;
    try {
        if (timeId !== "") {
            let updateData = await Time.findByIdAndUpdate(
                timeId, {
                    startingTime,
                    endTime,
                    slot,
                },
                {new: true}
            );
        } else {
            let createData = await Time.create({startingTime, endTime, slot})
        }
        res.redirect("/admin/time");
    } catch (error) {
        console.log(error.message)
    }
};
const createNotification = async (req, res) => {
    const {notificationId, title, content} = req.body;
    try {
        if (notificationId !== "") {
            let updateData = await Notification.findByIdAndUpdate(
                notificationId, {
                    title,
                    content,
                },
                {new: true}
            );
        } else {
            let createData = await Notification.create({title, content})
        }
        res.redirect("/admin/notification");
    } catch (error) {
        console.log(error.message)
    }
};
const getBook = async (req, res) => {
    let books = await Book.find({status: 1})
        .populate({path: "user", select: "fullname phone"})
        .lean();
    let newData = books.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    res.render("book", {
        title: "Quản lý đơn đặt bàn",
        layout: "dashlayout",
        bookList: newData,
    })
}
const getCancellationOrder = async (req, res) => {
    let books = await Book.find({status: 3})
        .populate({path: "user", select: "fullname phone"})
        .lean();
    let newData = books.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    res.render("cancellationorder", {
        title: "Quản lý đơn đặt bàn",
        layout: "dashlayout",
        bookList: newData,
    })
}
const getCompletedOrders = async (req, res) => {
    let books = await Book.find({status: 2})
        .populate({path: "user", select: "fullname phone"})
        .lean();
    let newData = books.map((item, index) => ({
        ...item,
        noNum: index + 1,
    }));
    res.render("completedorders", {
        title: "Quản lý đơn đặt bàn",
        layout: "dashlayout",
        bookList: newData,
    })
}


const deleteDish = async (req, res) => {
    const {dishIdDel} = req.body;
    let dishs = await Dish.findByIdAndDelete(dishIdDel);
    res.redirect("/admin/dish");
}
const deleteCategory = async (req, res) => {
    const {categoryIdDel} = req.body;
    let dishs = await Dish.deleteMany({category: categoryIdDel});
    let category = await Category.findByIdAndDelete(categoryIdDel);
    res.redirect("/admin/category");
}
const deleteNotification = async (req, res) => {
    const {notificationIdDel} = req.body;
    let notification = await Notification.findByIdAndDelete(notificationIdDel);
    res.redirect("/admin/notification");
}
const deleteTable = async (req, res) => {
    const {tableIdDel} = req.body;
    let tables = await Table.findByIdAndDelete(tableIdDel);
    res.redirect("/admin/table");
}
const deleteTime = async (req, res) => {
    const {timeIdDel} = req.body;
    let times = await Time.findByIdAndDelete(timeIdDel);
    res.redirect("/admin/time");
};
const deleteBook = async (req, res) => {
    const {bookIdDel} = req.body;
    let books = await Book.findByIdAndUpdate(bookIdDel,
        {
            status: 3,
        })
    res.redirect("/admin/cancellationorder");
}
const submitBook = async (req, res) => {
    const {bookIdSubmit} = req.body;
    let books = await Book.findByIdAndUpdate(bookIdSubmit,
        {
            status: 2,
        })
    res.redirect("/admin/completedorders");
}
const getBookByIdWeb = async (req, res) => {
    try {
        let books = await Book.findOne({_id: req.params.id}).select("dish -_id").lean();
        console.log(books.dish)
        let newData = books.dish.map((item, index) => ({
            ...item,
            noNum: index + 1,
        }));
        res.render("detaltorder", {
            title: "Chi tiết đơn hàng",
            layout: "dashlayout",
            bookList: newData,
        })
    } catch (error) {
        return res.status(200).json({status: false, msg: "1"});
    }
}
const getDishByCategoryWeb = async (req, res) => {
    try {
        let dishs = await Dish.find({category: req.params.id})
            .populate({path: "category", select: "nameCategory"})
            .lean();

        return res.status(200).json({status: true, data: dishs});
    } catch (error) {
        return res.status(200).json({status: false, msg: "1"});
    }
}
module.exports = {
    getDashboard,
    getUserMananger,
    getCategory,
    createCategory,
    getDish,
    createDish,
    getTable,
    createTable,
    getTime,
    createTime,
    deleteDish,
    deleteCategory,
    deleteTable,
    getBook,
    deleteTime,
    resetTime,
    getCancellationOrder,
    getCompletedOrders,
    getBookByIdWeb,
    getDishByCategoryWeb,
    deleteBook,
    submitBook,
    getNotification,
    createNotification,
    deleteNotification,
};