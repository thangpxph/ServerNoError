const express = require('express');
const exphbs = require("express-handlebars");
var app = express();
const passport = require("passport");
const expressSession = require("express-session");
const Routes = require("./routes/index");
const AdminRoutes = require("./routes/dashboard.route");

var initPassport = require("./passports/initSetup");
const flash = require("connect-flash");
app.use(flash());

//Cấu hình thư mục public
app.use(express.static(__dirname + "/public"));
//Cấu hình passport
app.use(
    expressSession({
      secret: "subee team",
      resave: false,
      saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

//Kết nối Mongo DB
const connectDB = require("./config/db");
connectDB();

//Cấu hình form gửi đi
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Cấu hình express handlebars
app.engine(
    "hbs",
    exphbs({
      extname: "hbs", // Tên đuôi file (VD: .hbs)
      defaultView: "main", //Tên layout mặc định
      layoutsDir: __dirname + "/views/layouts/", //Đường dẫn chứa layout mặc định
      partialsDir: __dirname + "/views/partials/", //Đường dẫn chứa layout mặc định
    })
);
app.set("view engine", "hbs");
//Điều hướng trong trang ngoài
app.use("/", Routes(passport));
//Kiểm tra đăng nhập
const isAuthenticated = function (req, res, next) {
    //Nếu đã đăng nhập thì tiếp tục điều hướng
    if (req.isAuthenticated()) return next();
    //Nếu chưa đăng nhập thì chuyển về trang đăng nhập
    res.redirect("/");
};
//Điều hướng trong trang quản trị
app.use("/admin/", isAuthenticated, AdminRoutes(passport));




module.exports = app;
