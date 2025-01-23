const Movie = require("../models/movieModel");

exports.createMovie = async (req, res) => {
    const { name, img, summary } = req.body;

    if (!name || !img || !summary) {
        return res.status(400).json({ status: "All fields are required" });
    }

    try {
        const newMovie = new Movie({ name, img, summary });
        await newMovie.save();
        return res.status(201).json({ status: 'Movie created', movie: newMovie });
    } catch (err) {
        return res.status(500).json({ error: 'Server error', details: err.message });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find({});
        return res.json(allMovies);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch movies", details: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: "No movie found" });
        }
        return res.json(movie);
    } catch (err) {
        return res.status(500).json({ error: "Error retrieving movie", details: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    const updates = req.body;
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ status: "At least one field must be provided" });
    }

    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!movie) {
            return res.status(404).json({ error: "No movie found" });
        }
        return res.json(movie);
    } catch (error) {
        return res.status(500).json({ error: "Update failed. Please check your data and ID." });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        return res.json({ status: "Success", message: "Movie deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error deleting movie", details: err.message });
    }
};
