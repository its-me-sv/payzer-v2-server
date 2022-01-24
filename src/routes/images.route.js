const router = require("express").Router();

// Custom
const { multerUploads, multerError } = require("../utils/multer.utils");
const convertToDataURI = require("../utils/to-uri.utils");
const {
    uploadImage,
    deleteImage
} =require("../utils/cloudinary.utils");
const { ImagesDeleteSchema } = require("../utils/joi.utils");

// Bytes
const maxSize = 7 * 1048576;

router.post("/upload", multerUploads, async (req, res) => {
    try {
        if (req.file.size > maxSize)
            return res.status(400).send("File size too large");
        const imageUri = convertToDataURI(req.file);
        const uploadResult = await uploadImage(imageUri);
        return res.status(200).send(uploadResult);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.delete("/delete", async (req, res) => {
    try {
        await ImagesDeleteSchema.validateAsync(req.body);
        const publicId = req.body.imageURL.split('/').slice(-2).join('/').split('.')[0];
        const deletedResponse = await deleteImage(publicId);
        return res.status(200).json(deletedResponse);
    } catch (err) {
        return res.status((err.isJoi && 400) || 500).json(err);
    }
});

module.exports = router;