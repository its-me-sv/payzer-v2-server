require("dotenv").config();
const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");

// Custom
const multerUploads = require("./utils/multer.utils");
const convertToDataURI = require("./utils/to-uri.utils");
const { cloudinary } = require("./utils/cloudinary.utils");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.json());

app.post("/images/upload", multerUploads, async (req, res) => {
    try {
        const imageUri = convertToDataURI(req.file);
        const uploadResult = await cloudinary.uploader.upload(imageUri, {
            folder: process.env.PRESET
        });
        return res.status(200).send(uploadResult);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.delete("/images/delete", async (req, res) => {
    try {
        const publicId = req.body.imageURL.split('/').slice(-2).join('/').split('.')[0];
        const deletedResponse = await cloudinary.uploader.destroy(publicId);
        return res.status(200).json(deletedResponse);
    } catch (err) {
        return res.status(500).json(err);
    }
});

io.on("connection", socket => {
    console.log(`[SERVER] ${socket.id} Connected`);
    socket.on("disconnect", () => {
        console.log(`[SERVER] ${socket.id} Disconnected`);
    });
    socket.on("new-transaction", data => console.log(JSON.parse(data)));
});

const PORT = process.env.port || process.env.PORT || process.env.Port || 5001;
const server = httpServer.listen(PORT, async () => {
    console.clear();
    console.log(`[SERVER] Listening to PORT ${PORT}`);
});

process.on("uncaughtException", async err => {
    server.close();
    console.log(`[SERVER] App crashed due to ${err.message}`);
    process.exit(1);
});