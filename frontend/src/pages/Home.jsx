import React, { useEffect } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { useGetAllProductsQuery } from "../features/api/productApi";
import { useNavigate } from "react-router-dom";
import { useCreateCartMutation } from "../features/api/cartApi";
import LoadingPage from "../components/LoadingPage";
import { useRef } from "react";
import ErrorPage from "../components/ErrorPage";

export default function Home() {
  const { data: getAllProducts, isLoading, error } = useGetAllProductsQuery();
  const [createCart] = useCreateCartMutation();
  const navigate = useNavigate();

  // const handelCartData = async (id) => {
  //   try {
  //     const cartData = { product_id: id, quantity: 1 };
  //     await createCart(cartData).unwrap();
  //     toast.success("Added to cart successfully");
  //     navigate(`/cart/${id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

   // Discount Price
   function calculateDiscountedPrice(originalPrice, discountPercent) {
    const discountAmount = (originalPrice * discountPercent) / 100;
    return Math.floor(originalPrice - discountAmount); // Returns the largest integer less than or equal to the result
  }

  // Scroll to top on mount & disable browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"; // Prevent browser from remembering the last position
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50); // Small delay ensures it works properly
  }, []);

  // To make scrolling smooth
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        className="bg-gray-100 py-16 px-6 text-center"
        style={{ backgroundImage: 'url("https://img.freepik.com/premium-photo/3d-rendering-online-shopping-chile-social-media-websites_307791-4355.jpg?w=1380")', backgroundSize: "cover" }}
      >
        <h1 className="text-4xl font-bold">Discover the Best Deals on Top Brands</h1>
        <p className="mt-4 text-gray-600">Shop the latest trends and enjoy fast delivery!</p>
        <button onClick={() => navigate('/products')} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Shop Now
        </button>
      </section>

      {/* Featured Products - Scrollable */}
      <section className="py-8 px-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Top Deals</h2>
        <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
          {getAllProducts?.slice(0, 10).map((product) => (
            <div key={product._id} onClick={() => navigate(`/product/${product._id}`)} className="min-w-[200px] bg-gray-100 p-4 rounded-lg cursor-pointer shadow hover:shadow-md">
              <img src={product.images[0]} alt={product.title} className="h-32 w-full object-contain" />
              <h3 className="mt-2 text-sm font-semibold line-clamp-2">{product.title}</h3>
              <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products - Grid Layout */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-center">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
          {getAllProducts?.map((product) => (
            <div key={product._id} onClick={() => navigate(`/product/${product._id}`)} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition p-4 cursor-pointer flex flex-col justify-between">
              <img src={product.images[0]} alt={product.title} className="h-40 w-full object-contain" />
              <h3 className="mt-2 text-sm font-semibold line-clamp-2">{product.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <div className="flex gap-2">
                  <p className="text-sm font-bold text-gray-900">₹{calculateDiscountedPrice(product.price, product.discountPercentage)}</p>
                  <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
                  <p className="text-sm text-green-600 font-semibold">{product.discountPercentage}% Off</p>
                </div>
              </div>
              <div className="flex items-center mt-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
                ))}
                <span className="text-gray-500 text-xs ml-1">(120 reviews)</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
