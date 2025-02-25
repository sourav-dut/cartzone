import React, { useEffect, useState } from "react";
import { ShoppingCart, Star, Truck, ShieldCheck } from "lucide-react";
import { useGetAllProductsQuery } from "../features/api/productApi";
import NotFound from "../components/NotFound";
import Login from "./authentication/Login";
import { useNavigate } from "react-router-dom";
import { useCreateCartMutation } from "../features/api/cartApi";

export default function Home() {
  const { data: getAllProducts, isLoading, error } = useGetAllProductsQuery();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(getAllProducts);
  }, [getAllProducts]);

  const handelCartData = async () => {
    
  }

  if (isLoading) return <p>Loading..........</p>;

  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-gray-100 py-16 px-6 text-center"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/premium-photo/3d-rendering-online-shopping-chile-social-media-websites_307791-4355.jpg?w=1380")',
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-4xl font-bold">Discover the Best Deals on Top Brands</h1>
        <p className="mt-4 text-gray-600">Shop the latest trends and enjoy fast delivery!</p>
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Shop Now
        </button>
      </section>

      {/* Popular Products */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center">Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {getAllProducts?.map((product, index) => (
            <div key={index} onClick={() => navigate(`/product/${product._id}`)} className="bg-white shadow-md p-4 rounded-md hover:shadow-lg">
              <div className="h-40 bg-gray-300 rounded-md">
                <img src={product.images[0]} alt={product.title} sizes="20px"  className="w-full h-full object-cover" />
              </div>
              <h3 className="mt-4 font-semibold">{product.title}</h3>
              <p className="text-gray-500">₹{product.price}</p>
              <div className="flex items-center mt-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />
                ))}
                <span className="text-gray-500 ml-2">(120 reviews)</span>
              </div>
              <button onClick={handelCartData} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-center">
          <div className="bg-white shadow-md p-6 rounded-md">
            <Truck size={32} className="mx-auto text-blue-500" />
            <h3 className="mt-4 font-semibold">Fast Delivery</h3>
            <p className="text-gray-500">Get your products delivered within 48 hours.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md">
            <ShieldCheck size={32} className="mx-auto text-blue-500" />
            <h3 className="mt-4 font-semibold">Secure Payment</h3>
            <p className="text-gray-500">100% safe and secure checkout.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md">
            <Star size={32} className="mx-auto text-blue-500" />
            <h3 className="mt-4 font-semibold">Top-rated Products</h3>
            <p className="text-gray-500">We offer only the best quality products.</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold">Stay Updated</h2>
        <p className="text-gray-500 mt-2">Subscribe to our newsletter for the latest deals.</p>
        <div className="mt-6 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-l-md w-64 outline-none"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
