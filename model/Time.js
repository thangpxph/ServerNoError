const mongoose = require("mongoose");
const Time = new mongoose.Schema({
    startingTime: {type: String},
    endTime: {type: String},
    slot: {type: Number},
});

module.exports = mongoose.model("Time", Time);