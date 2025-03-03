import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useCancelOrderMutation, useGetOrderByUserIdQuery } from "../../../features/api/orderApi";

const CustomerOrders = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data: orders, isLoading, error, refetch } = useGetOrderByUserIdQuery(user?._id);
  const [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await cancelOrder(orderId).unwrap();
      console.log("Order cancelled:", response);
      alert("Order cancelled successfully!");
      refetch();
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };
 
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading orders</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Total (₹)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border">
                  <td className="p-3 text-center">{order._id}</td>
                  <td className="p-3 text-center">₹{order.total.toFixed(2)}</td>
                  <td className="p-3 text-center">{order.status}</td>
                  <td className="p-3 text-center">{format(new Date(order.createdAt), "dd MMM yyyy")}</td>
                  <button onClick={() => handleCancelOrder(order._id)} className="p-3 text-center text-red-600">Cancel Order</button>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
