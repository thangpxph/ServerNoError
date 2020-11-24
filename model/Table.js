const mongoose = require("mongoose");
const Table = mongoose.Schema({
    nameTable: {type: String},
    amount: {type: Number},
    status: {type: Number},
});

module.exports = mongoose.model("Table", Table)