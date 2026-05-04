// const uploadCloudinary = require('../config/cloudnary');
// const Product = require('../models/Product.model');

// const addproduct = async (req, res) => {
//     try {
//         let { name, category, price, description, subCategory, sizes, date, bestSeller } = req.body

//         let image1 = await uploadCloudinary(req.files.image1[0].path);
//         let image2 = await uploadCloudinary(req.files.image2[0].path);
//         let image3 = await uploadCloudinary(req.files.image3[0].path);
//         let image4 = await uploadCloudinary(req.files.image4[0].path);

//         let productData = {
//             name,
//             category,
//             price : Number(price),
//             description,
//             subCategory,
//             sizes : JSON.parse(sizes),
//             date : Date.now(),
//             bestSeller : bestSeller === "true" ? true : false,
//             image1,
//             image2,
//             image3,
//             image4
//         }

//         const product = await Product.create(productData);

//         return res.status(201).json(product)

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:`Product failed to Add ${error}`})
//     }

// }
// module.exports = {
//     addproduct
// }

const uploadCloudinary = require("../config/cloudnary");
const Product = require("../models/product.model");

const addproduct = async (req, res) => {
  try {
    let {
      name,
      category,
      price,
      description,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // Upload images to Cloudinary
    const image1 = await uploadCloudinary(req.files.image1[0].path);
    const image2 = await uploadCloudinary(req.files.image2[0].path);
    const image3 = await uploadCloudinary(req.files.image3[0].path);
    const image4 = await uploadCloudinary(req.files.image4[0].path);

    const productData = {
      
      name,
      category,
      price: Number(price),
      description,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productData);

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to Add Product",
    });
  }
};

/* =========================================
   LIST PRODUCT
   Filters:
   ?category=Men
   ?subCategory=Shoes
   ?search=nike
========================================= */
const listProduct = async (req, res) => {
  try {
    const { category, subCategory, search } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to Fetch Products",
    });
  }
};

/* =========================================
   SINGLE PRODUCT
========================================= */
const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Fetch Product",
    });
  }
};

/* =========================================
   UPDATE PRODUCT
========================================= */
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Update Product",
    });
  }
};

/* =========================================
   DELETE PRODUCT
========================================= */
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Delete Product",
    });
  }
};

const viewProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to Fetch Product",
    });
  }
};

module.exports = {
  addproduct,
  listProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
  viewProduct,
};


