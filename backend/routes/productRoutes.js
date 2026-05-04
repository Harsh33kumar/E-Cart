
const express = require("express");
const ProductRoutes = express.Router();

const upload = require("../middleware/multer");

const {
  addproduct,
  listProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
  viewProduct
} = require("../controller/productConroller");

/* =========================================
   ADD PRODUCT
========================================= */
ProductRoutes.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addproduct
);

/* =========================================
   LIST PRODUCTS
   Example:
   /api/product/list
   /api/product/list?category=Men
   /api/product/list?subCategory=Shoes
   /api/product/list?search=nike
========================================= */
ProductRoutes.get("/list", listProduct);

/* =========================================
   SINGLE PRODUCT
========================================= */
ProductRoutes.get("/single/:id", singleProduct);
ProductRoutes.get("/view/:id", viewProduct);

/* =========================================
   UPDATE PRODUCT
========================================= */
ProductRoutes.put("/update/:id", updateProduct);

/* =========================================
   DELETE PRODUCT
========================================= */
ProductRoutes.delete("/delete/:id", deleteProduct);

module.exports = ProductRoutes;