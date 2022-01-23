require("dotenv").config();
const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const morgan = require("morgan");

// Custom
const morganConfig = require("./src/configs/morgan.config");
const imagesRoute = require("./src/routes/images.route");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(morgan(morganConfig));
app.use(express.json());

app.use("/images", imagesRoute);

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