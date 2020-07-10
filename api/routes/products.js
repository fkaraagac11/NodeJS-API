const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

router.get("/", (req, res, next) => {
    Product.find()
        .exec()
        .then((docs) => {
            console.log(docs);
            //   if (docs.length >= 0) {
            res.status(200).json(docs);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then((doc) => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Product = require("../models/product");
// const mongoose = require("mongoose");

// router.get("/", (req, res, next) => {
//     res.status(200).json({
//         message: "This is GET request to /products",
//     });
// });

// router.post("/", (req, res, next) => {
//     const product = new Product({
//         name: req.body.name,
//         price: req.body.price,
//     });

//     product
//         .save()
//         .then((result) => {
//             console.log(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     res.status(201).json({
//         message: "Handling *****POST*** requests to /products",
//         createdProduct: product,
//     });
// });

// router.get("/:productId", (req, res, next) => {
//     const id = req.params.productId;
//     Product.findById(id)
//         .then((doc) => {
//             console.log(doc);
//             res.status(200).json(doc);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });

//     // if (id === "special") {
//     //     res.status(200).json({
//     //         message: "You discovered the special ID",
//     //     });
//     // } else {
//     //     res.status(200).json({
//     //         message: "You passed ID",
//     //     });
//     // }
// });

// router.patch("/:productId", (req, res, next) => {
//     res.status(200).json({
//         message: "Updated request",
//     });
// });

// router.delete("/:productId", (req, res, next) => {
//     res.status(200).json({
//         message: "Delete request",
//     });
// });

// module.exports = router;
