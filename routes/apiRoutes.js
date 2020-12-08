const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/usersController");

const apiRoutes = (passport) => {
    const jwtAuthenticated = passport.authenticate("jwt", { session: false });

    router.post("/login", userController.loginUser);

    router.post('/signin', userController.signinUser);
    router.post("/comparisonPhone", userController.comparisonPhone);
    router.post("/forgotPasswordById", userController.forgotPassword);
    router.get("/category", jwtAuthenticated, userController.getCategory);
    router.get("/table", jwtAuthenticated, userController.getTable);
    router.get("/time", jwtAuthenticated, userController.getTime);
    router.get("/dish", jwtAuthenticated, userController.getDish);
    router.post("/bookDish", jwtAuthenticated, userController.bookDish);
    router.post("/dishByCategory", jwtAuthenticated, userController.getDishByCategory);
    router.post("/bookById", jwtAuthenticated, userController.getBookById);
    return router;
};

module.exports = apiRoutes;
