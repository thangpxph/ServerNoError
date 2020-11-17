const express = require("express");
const dashboard = require("../controllers/dashboard.controller");
const router = express.Router();

const AdminRoutes = (passport) => {
    router.get("/", dashboard.getDashboard);
    router.get("/users", dashboard.getUserMananger);
    return router;
};

module.exports = AdminRoutes;
