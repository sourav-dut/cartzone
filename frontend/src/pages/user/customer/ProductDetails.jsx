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

  // Calculate and store discount once when product loads
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
      discountData.push({productId: productId, productDiscount: productDiscount});
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
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex gap-4 items-start">
          <div className="flex flex-col space-y-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.title}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img ? "border-blue-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-[500px] rounded-lg object-cover border border-gray-300"
            />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-3xl font-semibold mt-6">₹{discountedPrice}</p>
          <p className="text-2xl text-gray-500 line-through">₹{product.price}</p>
          <p className="text-sm text-green-600 font-semibold">{product.discountPercentage}% Off</p>


          <div className="flex items-center mt-6 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} fill={i < product.rating ? "currentColor" : "none"} />
            ))}
            <span className="text-gray-500 ml-2">({product.reviewsCount} reviews)</span>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 text-lg font-semibold"
            >
              Buy Now
            </button>

            <button
              onClick={handleCart}
              disabled={cartIsLoading}
              className="flex-1 bg-yellow-500 text-white py-4 rounded-lg hover:bg-yellow-600 text-lg font-semibold"
            >
              {cartIsLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>

          <div className="mt-8 p-4 border border-gray-300 rounded-lg">
            <p className="text-lg font-semibold">Available Offers:</p>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              <li>Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
              <li>Special Price: Get extra 77% off (price inclusive of cashback/coupon)</li>
              <li>Free Delivery: Within 2 Days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
