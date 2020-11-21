const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Dish = new mongoose.Schema({
    imageDish:{type: String},
    nameDish: {type: String},
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true},
    price:{type: Number},
    time:{type: Number},
    ingredient:{type: String},
    status:{type: String},
});

module.exports = mongoose.model("Dish", Dish);