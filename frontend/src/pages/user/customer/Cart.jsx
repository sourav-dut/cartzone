import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../features/cartSlice";
import { useDeleteCartMutation, useGetCartQuery } from "../../../features/api/cartApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingPage from "../../../components/LoadingPage";
import ErrorPage from "../../../components/ErrorPage";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { data: getCart, isLoading, error, refetch } = useGetCartQuery(userId);
  console.log(getCart);

  useEffect(() => {
    refetch();
  }, []);

   // when a page is open i want to open with top
    useEffect(() => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }, []);

  const [deleteCartItem] = useDeleteCartMutation();

  const handleRemove = async (cartId, productId) => {
    try {
      await deleteCartItem(cartId).unwrap();
      
      // Remove the product's discount from localStorage
      let discountData = JSON.parse(localStorage.getItem("productDiscount")) || [];
  
      // Filter out the discount entry related to the removed product
      discountData = discountData.filter(discount => discount.productId !== productId);
  
      // Save the updated discount data back to localStorage
      localStorage.setItem("productDiscount", JSON.stringify(discountData));
  
      toast.info("Item removed from cart");
      refetch();
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };
  

  const handelPlaceOrder = () => {
    navigate(`/checkout/${userId}`);
  };

  let discountData = JSON.parse(localStorage.getItem("productDiscount")) || [];

  // calculate discount persentage
    const totalDiscount = discountData.reduce((total, discount) => {
      return discount.productDiscount + total
    }, 0)

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  const totalPrice = getCart?.reduce((acc, item) => acc + item.product_id?.price * item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center pt-20">
      <div className="max-w-5xl w-full grid grid-cols-3 gap-6">
        {/* Left Section - Cart Items */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart ({getCart?.length})</h2>

          {!getCart || getCart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            getCart.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product_id?.images?.[0] || "/placeholder.jpg"}
                    alt={item.product_id?.title || "Product"}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.product_id?.title}</h3>
                    <p className="text-gray-500">₹{item.product_id?.price}</p>
                    <p className="text-red-500 font-semibold">{item.quantity >= 1 ? <p className="text-green-600">In Stock</p> : "Out Of Stock"}</p>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleRemove(item._id, item.product_id?._id)}>
                  REMOVE
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right Section - Price Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold border-b pb-2">Price Details</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between text-gray-700">
              <span>Price ({getCart?.length} items)</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-gray-700">
              <span>Discount</span>
              <span className="text-green-600">₹{totalDiscount}</span>
            </p>
            <p className="flex justify-between text-gray-700">
              <span>Delivery Charges</span>
              {totalPrice - totalDiscount >= 500 ? <span className="text-green-600">Free</span> : <span className="text-green-600">₹40</span>}
            </p>
            <hr />
            <p className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              {totalPrice - totalDiscount >= 500 ? <span>₹{(totalPrice - totalDiscount).toFixed(2)}</span> : <span>₹{(totalPrice - totalDiscount + 40).toFixed(2)}</span>}
            </p>
            <button onClick={handelPlaceOrder} className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}