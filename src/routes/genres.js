import express from "express";
import GenresController from "../controllers/genres.js";

const genresRouter = express.Router();
const genresController = new GenresController();

genresRouter.get('/', genresController.getAllGenres)
genresRouter.get('/:id', genresController.getGenresDetail)
genresRouter.post('/', genresController.createGenres)
genresRouter.put('/:id', genresController.updateGenres)
genresRouter.delete('/:id', genresController.deleteGenres)

export default genresRouter
