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
    router.get("/notification", dashboard.getNotification);
    router.post("/time/create", dashboard.createTime);
    router.post("/notification/create", dashboard.createNotification);
    router.post("/dish/delete", dashboard.deleteDish);
    router.post("/category/delete", dashboard.deleteCategory);
    router.post("/notification/delete", dashboard.deleteNotification);
    router.post("/table/delete", dashboard.deleteTable);
    router.post("/time/delete", dashboard.deleteTime);
    router.post("/book/delete", dashboard.deleteBook);
    router.post("/book/submit", dashboard.submitBook);
    router.post("/time/reset", dashboard.resetTime);
    router.get("/book", dashboard.getBook);
    router.get("/cancellationorder", dashboard.getCancellationOrder);
    router.get("/completedorders", dashboard.getCompletedOrders);
    router.get("/dishByCategoryWeb/:id", dashboard.getDishByCategoryWeb);
    router.get("/bookByIdWeb/:id", dashboard.getBookByIdWeb);
    router.get("/bookByIdUser/:id", dashboard.getBookByIdUser);
    return router;
};
module.exports = AdminRoutes;
