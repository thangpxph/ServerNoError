const express = require("express");
const dashboard = require("../controllers/dashboard.controller");
const upload = require("../config/multer");
const router = express.Router();


const AdminRoutes = (passport) => {
    router.get("/", dashboard.getDashboard);
    router.get("/users", dashboard.getUserMananger);
    router.get("/category", dashboard.getCategory);
    router.post("/category/create", dashboard.createCategory);
    router.get("/dish", dashboard.getDish);
    router.post("/dish/create", upload.single('image') , dashboard.createDish);
    router.get("/table", dashboard.getTable);
    router.post("/table/create", dashboard.createTable);
    router.get("/time", dashboard.getTime);
    router.post("/time/create", dashboard.createTime);
    router.post("/dish/delete", dashboard.deleteDish);
    router.post("/category/delete", dashboard.deleteCategory);
    router.post("/table/delete", dashboard.deleteTable);
    router.post("/time/delete", dashboard.deleteTime);
    router.get("/book", dashboard.getBook);
    return router;
};
module.exports = AdminRoutes;
