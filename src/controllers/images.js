import { StatusCodes } from "http-status-codes";
import { cloudinary } from "../config/cloudinaryConfig";
import ApiError from "../utils/apiError";

class ImageContorller {
    uploadSingleImage(req, res, next) {
        try {
            if (!req.file) throw new ApiError(404, "No File Upload");

            res.status(StatusCodes.OK).json({
                message: "successfully uploaded",
                imageUrl: req.file.path,
            });
        } catch (error) {
            next(error);
        }
    }
    async deleteImage(req, res, next) {
        try {
            const { result } = await cloudinary.uploader.destroy(
                `${process.env.FOLDER_NAME}/${req.params.id}`
            );
            if (result !== "success") throw new ApiError(404, "Delete Image Failed");

            res.status(StatusCodes.OK).json({
                message: "successfully deleted",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ImageContorller;