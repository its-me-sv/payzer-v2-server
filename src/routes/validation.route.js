const router = require("express").Router();

router.get("/api", (req, res) => {
    return res.status(200).json("API - Check SUCCESS");
});

module.exports = router;