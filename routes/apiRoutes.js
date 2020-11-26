const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/usersController");

const apiRoutes = (passport) => {
    const jwtAuthenticated = passport.authenticate("jwt", { session: false });

    router.post("/login", userController.loginUser);

    router.post('/signin', userController.signinUser);

    router.get("/category", jwtAuthenticated, userController.getCategory);
    router.get("/table", jwtAuthenticated, userController.getTable);
    router.get("/time", jwtAuthenticated, userController.getTime);
    return router;
};

module.exports = apiRoutes;
