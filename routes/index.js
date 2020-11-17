var express = require('express');
const login = require("../controllers/login.controller");
var router = express.Router();

const Routes = (passport) => {
  router.get("/", login.getLogin);

  return router;
};

module.exports = Routes;
