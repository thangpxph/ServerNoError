const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "https-servernoerror-herokuapp-com",
    api_key: "195927612357955",
    api_secret: "PRV5Lca6L4GPIyvEPplQmlIYmPE"
})
module.exports = cloudinary;