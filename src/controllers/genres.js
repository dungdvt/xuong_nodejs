import Genre from "../models/genreModel.js";
class GenresController {
    async getAllGenres(req, res) {
        try {
            const genreList = await Genre.find();
            res.status(200).json({
                message: " get all genres",
                data: genreList,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    async getGenresDetail(req, res) {
        try {
            const genre = await Genre.findById(req.params.id);
            if(!genre) {
                return res.status(404).json({
                    message: " not found genres"
                })
            }
            res.status(200).json({
                message: " get genres detail",
                data: genre,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    async createGenres(req, res) {
        try {
            const genre = await Genre.create(req.body);
            res.status(201).json({
                message: " create genres ",
                data: genre,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    async updateGenres(req, res) {
        try {
            const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if(!genre) {
                return res.status(404).json({
                    message: " not found genres"
                })
            }
            res.status(200).json({
                message: " update genres ",
                data: genre,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
    async deleteGenres(req, res) {
        try {
            const genre = await Genre.findByIdAndDelete(req.params.id);
            if(!genre) {
                return res.status(404).json({
                    message: " not found genres"
                })
            }
            res.status(200).json({
                message: " delete genres ",
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
}
export default GenresController