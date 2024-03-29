require("dotenv").config();

// Custom
const { app, io, httpServer } = require("./src/utils/server.utils");
const combineMiddlewares = require("./src/utils/middleware.utils");
const combineRoutes = require("./src/routes");
const socketHandler = require("./src/utils/socket.utils");

// middlewares
combineMiddlewares(app);

// routes
combineRoutes(app);

// socket
socketHandler(io);

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