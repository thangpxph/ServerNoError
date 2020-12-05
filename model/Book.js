const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishList = mongoose.Schema({
    dishId: {type: Schema.Types.ObjectId, ref: "Dish", require: true},
    amount: {type: Number},
})
Book = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", require: true},
    time: {type: Schema.Types.ObjectId, ref: "Time", require: true},
    dish: [dishList]
});
module.exports = mongoose.model("Book", Book);