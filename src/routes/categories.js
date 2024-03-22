import express from "express";
import CategoriesController from "../controllers/categories.js";

const categoriesRouter = express.Router();
const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.getAllCategories)
categoriesRouter.get('/:id', categoriesController.getCategoriesDetail)
categoriesRouter.post('/', categoriesController.createCategories)
categoriesRouter.put('/:id', categoriesController.updateCategories)
categoriesRouter.delete('/:id', categoriesController.deleteCategories)

export default categoriesRouter
