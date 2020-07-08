const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "This is GET request to /products",
    });
});

router.post("/", (req, res, next) => {
    res.status(200).json({
        message: "This is POST request to /products",
    });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    if (id === "special") {
        res.status(200).json({
            message: "You discovered the special ID",
        });
    } else {
        res.status(200).json({
            message: "You passed ID",
        });
    }
});

router.patch("/:productId", (req, res, next) => {
    res.status(200).json({
        message: "Updated request",
    });
});

router.delete("/:productId", (req, res, next) => {
    res.status(200).json({
        message: "Delete request",
    });
});

module.exports = router;
