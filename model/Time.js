const mongoose = require("mongoose");
const Time = new mongoose.Schema({
    startingTime: {type: String},
    endTime: {type: String},
});

module.exports = mongoose.model("Time", Time);