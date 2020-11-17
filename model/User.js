const mongoose = require("mongoose");
const User = new mongoose.Schema({
  fullname: { type: String },
  phone: { type: String, unique: true },
  password: { type: String },
});

module.exports = mongoose.model("User", User);
