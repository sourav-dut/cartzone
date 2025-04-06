import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useGetProductByIdQuery } from "../../../features/api/productApi";
import { useCreateCartMutation } from "../../../features/api/cartApi";
import { toast } from "react-toastify";
import LoadingPage from "../../../components/LoadingPage";
import ErrorPage from "../../../components/ErrorPage";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error, refetch } = useGetProductByIdQuery(productId);
  const [createCart, { isLoading: cartIsLoading }] = useCreateCartMutation();

  const [selectedImage, setSelectedImage] = useState("");
  const [productDiscount, setProductDiscount] = useState(0);

  useEffect(() => {
    if (product) {
      const discountAmount = Math.floor(product.price * product.discountPercentage / 100);
      setProductDiscount(discountAmount);
    }
  }, [product]);

  const discountedPrice = product ? Math.floor(product.price - productDiscount) : 0;

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const { _id: userId } = JSON.parse(localStorage.getItem("user") || "{}");

  const handleCart = async () => {
    if (!userId) {
      toast.error("Please log in to add items to the cart!");
      navigate("/login");
      return;
    }
    try {
      await createCart({ product_id: productId, quantity: 1, discountPrice: discountedPrice || product.price }).unwrap();
      toast.success("Added to cart successfully");

      let discountData = JSON.parse(localStorage.getItem("productDiscount")) || [];
      discountData.push({ productId: productId, productDiscount: productDiscount });
      localStorage.setItem("productDiscount", JSON.stringify(discountData));

      navigate(`/cart/${userId}`);
      refetch();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleBuyNow = () => {
    if (!userId) {
      toast.error("Please log in to purchase items!");
      navigate("/login");
      return;
    }
    navigate(`/checkout/${userId}?productId=${productId}`);
  };

  if (isLoading || cartIsLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 mr-10 gap-8">
        {/* Left: Product Images */}
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded-lg"
          />
          <div className="flex justify-center gap-4 mt-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-13 h-13 object-cover rounded-b-md cursor-pointer ${selectedImage === img ? "ring-1 ring-blue-600" : ""
                  }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-600 text-sm">Visit the brand store</p>

          <div className="flex-row items-center gap-4 mt-6">
            <p className="text-2xl font-bold text-gray-800">₹{discountedPrice} <span className="text-sm text-gray-600">(Incl. of all taxes)</span></p>
            <div>
              <p className="text-xl text-gray-500 inline-block line-through">₹{product.price}</p>
              <span className="text-sm font-semibold ml-3 text-green-600 bg-green-100 px-2 py-1 rounded">
                {product.discountPercentage}% OFF
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-3">EMI starts from ₹4,646/mo. <span className="text-blue-600 cursor-pointer">See EMI options</span></p>
            <p className="text-green-600 font-medium mt-2">✔ In stock</p>
          </div>

          {/* Quantity + Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <label htmlFor="qty" className="text-sm">Qty</label>
            <input
              id="qty"
              type="number"
              defaultValue={1}
              min={1}
              className="w-16 px-2 py-1 border rounded"
            />
            <button
              onClick={handleCart}
              className="bg-white border border-gray-400 text-black px-4 py-2 rounded hover:bg-gray-100"
            >
              <ShoppingCart className="inline-block mr-1" size={18} />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery */}
          <div className="mt-4 text-sm text-gray-600">
            🚚 <span className="font-semibold">Free delivery</span> by <span className="text-green-700 font-semibold">8 April, 2025</span>
          </div>

          {/* Product Description Section */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Product Description</h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>
          </div>

          {/* Offers Section */}
          <div className="mt-6 border border-gray-300 p-4 rounded">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Extra Deals Available</h3>
            <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
              <li>Flat ₹5,000 Instant Discount on ICICI Bank Credit/Debit Card</li>
              <li>Flat ₹4,000 Instant Discount on HDFC Credit Card EMI (6M+)</li>
              <li>Flat ₹5,000 Instant Discount on Axis Bank Credit Card</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}