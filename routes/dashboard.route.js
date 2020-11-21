const express = require("express");
const dashboard = require("../controllers/dashboard.controller");
const router = express.Router();

const AdminRoutes = (passport) => {
    router.get("/", dashboard.getDashboard);
    router.get("/users", dashboard.getUserMananger);
    router.get("/category", dashboard.getCategory);
    router.post("/category/create", dashboard.createCategory);
    router.get("/dish", dashboard.getDish);
    router.post("/dish/create", dashboard.createDish);
    return router;
};

module.exports = AdminRoutes;
