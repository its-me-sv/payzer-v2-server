const router = require("express").Router();

// Custom
const multerUploads = require("../utils/multer.utils");
const convertToDataURI = require("../utils/to-uri.utils");
const {
    uploadImage,
    deleteImage
} =require("../utils/cloudinary.utils");

router.post("/upload", multerUploads, async (req, res) => {
    try {
        const imageUri = convertToDataURI(req.file);
        const uploadResult = await uploadImage(imageUri);
        return res.status(200).send(uploadResult);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const publicId = req.body.imageURL.split('/').slice(-2).join('/').split('.')[0];
        const deletedResponse = await deleteImage(publicId);
        return res.status(200).json(deletedResponse);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;