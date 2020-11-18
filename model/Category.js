const mongoose = require("mongoose");
const Category = new mongoose.Schema({
    nameCategory: { type: String },
});
module.exports = mongoose.model("Category", Category);
