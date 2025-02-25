import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useGetProductByIdQuery } from "../../../features/api/productApi";
import { useCreateCartMutation } from "../../../features/api/cartApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);
  console.log(product);
  const navigate = useNavigate();
  
  const [createCart, { isLoading: cartIsLoading, error: cartError }] = useCreateCartMutation();

  const cartData = {
    product_id: productId,
    quantity: 1
  }
  

  const handleCart = async () => {
    try {
      const response = await createCart(cartData).unwrap();
      console.log(response);
      toast.success("Added to cart successfully");
      navigate("/cart")
    } catch (error) {
      console.log(error);
      toast.error("Somthing wrong!!");
    }
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading product</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Images */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-col space-y-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={selectedImage || product.images[0]}
              alt={product.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl font-semibold mt-4">₹{product.price}</p>

          <div className="flex items-center mt-4 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} />
            ))}
            <span className="text-gray-500 ml-2">(120 reviews)</span>
          </div>
          <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
            <ShoppingCart size={20} /> Buy Now
          </button>
          <button onClick={handleCart} className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
            <ShoppingCart size={20} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
