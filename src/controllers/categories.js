import Category from "../models/categoriesModel.js";
class CategoriesController {
    async getAllCategories(req, res) {
        try {
            const categoryList = await Category.find();
            res.status(200).json({
                message: " get all categories",
                data: categoryList,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    async getCategoriesDetail(req, res) {
        try {
            const category = await Category.findById(req.params.id);
            if(!category) {
                return res.status(404).json({
                    message: " not found categories"
                })
            }
            res.status(200).json({
                message: " get categories detail",
                data: category,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    async createCategories(req, res) {
        try {
            const category = await Category.create(req.body);
            res.status(201).json({
                message: " create categories ",
                data: category,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    async updateCategories(req, res) {
        try {
            const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if(!category) {
                return res.status(404).json({
                    message: " not found categories"
                })
            }
            res.status(200).json({
                message: " update categories ",
                data: category,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    async deleteCategories(req, res) {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            if(!category) {
                return res.status(404).json({
                    message: " not found categories"
                })
            }
            res.status(200).json({
                message: " delete categories ",
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
}
export default CategoriesController