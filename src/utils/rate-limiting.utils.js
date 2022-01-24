const rateLimiter = require("express-rate-limit");

const WINDOW_TIME = +process.env.WINDOW_TIME;
const MAX_REQUESTS = +process.env.MAX_REQUESTS;

const serverRateLimiter = rateLimiter({
    windowMs: WINDOW_TIME * 1000,
    max: MAX_REQUESTS,
    legacyHeaders: false
});

module.exports = {
    serverRateLimiter
};