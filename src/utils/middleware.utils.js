// packages
const express = require("express");
const morgan = require("morgan");

// custom
const morganConfig = require("../configs/morgan.config");

const combineMiddlewares = app => {
    app.use(morgan(morganConfig));
    app.use(express.json());
};

module.exports = combineMiddlewares;