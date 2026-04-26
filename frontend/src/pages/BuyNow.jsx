import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function BuyNow() {
  const { state } = useLocation();
  const { product, size } = state;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/order/place", {
        ...form,
        productId: product._id,
        size,
        amount: product.price,
      });

      alert("Order Placed Successfully");

      setForm({
        name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Product Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10">
          <img
            src={product.image1}
            alt={product.name}
            className="w-full h-[380px] object-cover rounded-2xl mb-6"
          />

          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <p className="text-slate-300 mb-4 leading-7">
            {product.description}
          </p>

          <div className="space-y-2 text-lg">
            <p>
              Price:{" "}
              <span className="text-green-400 font-bold">
                ₹{product.price}
              </span>
            </p>

            <p>
              Selected Size:{" "}
              <span className="text-cyan-400 font-semibold">{size}</span>
            </p>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10">
          <h2 className="text-3xl font-bold mb-6">Shipping Details</h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400"
            />

            <textarea
              rows="5"
              placeholder="Complete Address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400 resize-none"
            ></textarea>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 py-4 rounded-xl text-lg font-semibold"
            >
              {loading ? "Placing Order..." : `Place Order ₹${product.price}`}
            </button>
          </div>

          <p className="text-sm text-slate-400 mt-5 text-center">
            Cash on Delivery Available
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;