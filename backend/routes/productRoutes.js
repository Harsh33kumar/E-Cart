// const express = require("express");
// const ProductRoutes = express.Router();

// const upload = require("../middleware/multer");
// const Product = require("../models/product.model");

// ProductRoutes.post(
//   "/add",
//   upload.fields([
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//     { name: "image3", maxCount: 1 },
//     { name: "image4", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       console.log(req.body);
//       console.log(req.files);

//       let sizes = [];

//       if (req.body.sizes) {
//         sizes = JSON.parse(req.body.sizes);
//       }

//       const product = await Product.create({
//         name: req.body.name,
//         image1: req.files.image1[0].filename,
//         image2: req.files.image2[0].filename,
//         image3: req.files.image3[0].filename,
//         image4: req.files.image4[0].filename,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.category,
//         subCategory: req.body.subCategory,
//         sizes,
//         bestSeller: req.body.bestSeller === "true",
//       });

//       res.json({
//         success: true,
//         message: "Product Added",
//         product,
//       });
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
// );

// module.exports = ProductRoutes;

// const express = require("express");
// const ProductRoutes = express.Router();

// const upload = require("../middleware/multer");
// const { addproduct } = require("../controller/productConroller");

// ProductRoutes.post(
//   "/add",
//   upload.fields([
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//     { name: "image3", maxCount: 1 },
//     { name: "image4", maxCount: 1 },
//   ]),
//   addproduct
// );

// module.exports = ProductRoutes;

const express = require("express");
const ProductRoutes = express.Router();

const upload = require("../middleware/multer");

const {
  addproduct,
  listProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
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

/* =========================================
   UPDATE PRODUCT
========================================= */
ProductRoutes.put("/update/:id", updateProduct);

/* =========================================
   DELETE PRODUCT
========================================= */
ProductRoutes.delete("/delete/:id", deleteProduct);

module.exports = ProductRoutes;