const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/Assignment1")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("Mongo Error", err);
    });

module.exports = mongoose;
