const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishList = mongoose.Schema({
    imageDish:{type: String},
    nameDish: {type: String},
    amount: {type: Number},
})
Book = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", require: true},
    people: {type: Number},
    time: {type: String},
    dish: [dishList],
    money: {type: Number},
    status: Number
});
module.exports = mongoose.model("Book", Book);