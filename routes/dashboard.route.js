const express = require("express");
const dashboard = require("../controllers/dashboard.controller");
const router = express.Router();

const AdminRoutes = (passport) => {
    router.get("/", dashboard.getDashboard);
    return router;
};

module.exports = AdminRoutes;
