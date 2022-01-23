const imagesRoute = require("./images.route");

const combineRoutes = app => {
    app.use("/images", imagesRoute);
};

module.exports = combineRoutes;