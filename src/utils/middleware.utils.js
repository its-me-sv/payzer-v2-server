// packages
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// custom
const morganConfig = require("../configs/morgan.config");
const { serverRateLimiter } = require("./rate-limiting.utils");

const combineMiddlewares = app => {
    app.use(helmet());
    app.use(serverRateLimiter);
    app.use(morgan(morganConfig));
    app.use(express.json());
};

module.exports = combineMiddlewares;