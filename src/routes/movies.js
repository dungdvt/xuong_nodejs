import express from "express";
import MoviesController from "../controllers/movies.js";

const moviesRouter = express.Router();
const moviesController = new MoviesController();

moviesRouter.get('/',moviesController.getAllMovies);
moviesRouter.get('/:id',moviesController.getMoviesDetails);
moviesRouter.post('/',moviesController.createMovies);
moviesRouter.put('/:id',moviesController.updateMovies);
moviesRouter.delete('/:id',moviesController.deleteMovies);

export default moviesRouter;