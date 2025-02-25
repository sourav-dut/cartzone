import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../features/cartSlice";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.info("Item removed from cart");
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold">Your cart is empty!</h3>
            <NavLink to="/" className="text-blue-500 mt-4 inline-block">
              Continue Shopping →
            </NavLink>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemove(item.id)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right">
              <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
