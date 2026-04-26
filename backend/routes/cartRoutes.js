const express = require("express");
const router = express.Router();

const {
 addCart,
 listCart,
 deleteCart
} = require("../controller/cartController");

router.post("/add", addCart);
router.get("/list", listCart);
router.delete("/delete/:id", deleteCart);

module.exports = router;