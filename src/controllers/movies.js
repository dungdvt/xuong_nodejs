import Movie from "../models/movieModel.js";
class MoviesController {
    // Get /movies/
    async getAllMovies(req, res) {
        try {
            const movies = await Movie.find().populate("category");
            res.status(200).json({
                message: "get all movies done",
                data: movies,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    // Get /movies/:id
    async getMoviesDetails(req, res) {
        try {
            const movie = await Movie.findById(req.params.id).populate("category").populate("genres");
            if (!movie) {
                return res.status(404).json({
                    message: "movie not found",
                });
            }
            res.status(200).json({
                message: "get movie detail done",
                data: movie,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    // Post /movies/
    async createMovies(req, res) {
        // res.send("Get all laptops");
        console.log(req.body);
        try {
            const movies = await Movie.create(req.body);
            res.status(201).json({
                message: " create movies success!",
                data: movies
            })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    // Put /movies/
    async updateMovies(req, res) {
        // res.send("Get all laptops");
        try {
            const movies = await Laptops.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (!movies) {
                res.status(404).json({ message: "moviess not found!" });
            }
            res.status(200).json({
                message: "update movies success!",
                data: movies
            })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    // Delete /movies/
    async deleteMovies(req, res) {
        try {
            const movie = await Movie.findByIdAndDelete(req.params.id);
            if (!movie) {
                return res.status(404).json({
                    message: "movie not found",
                });
            }
            res.status(200).json({
                message: "delete movie done",
                data: movie,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
}
export default MoviesController;