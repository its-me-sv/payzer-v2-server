const socketHandler = io => {
    io.on("connection", socket => {
        console.log(`[SERVER] ${socket.id} Connected`);
        socket.on("disconnect", () => {
            console.log(`[SERVER] ${socket.id} Disconnected`);
        });
        socket.on("new-transaction", data => console.log(JSON.parse(data)));
    });
};

module.exports = socketHandler;