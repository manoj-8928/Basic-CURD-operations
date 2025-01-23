const mongoose = require("../database");

const movieSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        img: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
