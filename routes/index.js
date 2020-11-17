var express = require('express');
const login = require("../controllers/login.controller");
const signup = require("../controllers/signup.controller");
var router = express.Router();

const Routes = (passport) => {
  router.get('/', login.getLogin);
  router.post('/signin', login.postLogin(passport));
  router.get("/signup", signup.getSignUp);
  router.post("/signup", signup.postSignUp(passport));
  return router;
};

module.exports = Routes;
