require("dotenv").config();

// Custom
const { app, io, httpServer } = require("./src/utils/server.utils");
const appyMiddleWares = require("./src/utils/middleware.utils");
const imagesRoute = require("./src/routes/images.route");

// middlewares
appyMiddleWares(app);

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