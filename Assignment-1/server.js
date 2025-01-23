
const express = require("express");
const app = express();
const movieController = require("./controller/movieController");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.route("/api/movies/:id")
    .get(movieController.getMovieById)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

app.route("/api/movies")
    .get(movieController.getAllMovies)
    .post(movieController.createMovie);


app.get("/movies", async (req, res) => {
    const allMovies = await Movie.find({});
    const html = `<ul>${allMovies.map((movie) => `<li>${movie.name}</li>`).join("")}</ul>`;
    return res.send(html);
});


app.listen(5005, () => {
    console.log("Server Started on http://localhost:5005");
});
