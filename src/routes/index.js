const imagesRoute = require("./images.route");
const validationRoute = require("./validation.route");

const combineRoutes = app => {
    app.use("/images", imagesRoute);
    app.use("/validation", validationRoute);
};

module.exports = combineRoutes;