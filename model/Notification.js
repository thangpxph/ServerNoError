const mongoose = require("mongoose");
const Notification = new mongoose.Schema({
    title:{type: String},
    content: {type: String},
});
module.exports = mongoose.model("Notification", Notification);