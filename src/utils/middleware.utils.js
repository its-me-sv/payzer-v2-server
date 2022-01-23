// packages
const express = require("express");
const morgan = require("morgan");

// custom
const morganConfig = require("../configs/morgan.config");

const appyMiddleWares = app => {
    app.use(morgan(morganConfig));
    app.use(express.json());
};

module.exports = appyMiddleWares;