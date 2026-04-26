const Cart = require("../models/cart.model");

const addCart = async (req,res)=>{
  try{
    const cart = await Cart.create(req.body);

    res.json({
      success:true,
      message:"Added To Cart",
      cart
    });

  }catch(error){
    res.status(500).json({success:false});
  }
};

const listCart = async(req,res)=>{
  const carts = await Cart.find()
    .populate("productId");

  res.json({
    success:true,
    carts
  });
};

const deleteCart = async(req,res)=>{
  await Cart.findByIdAndDelete(req.params.id);

  res.json({
    success:true,
    message:"Removed"
  });
};

module.exports = {
  addCart,
  listCart,
  deleteCart
};
