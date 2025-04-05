import React, { useEffect } from "react";
import { format } from "date-fns";
import { useGetOrderByUserIdQuery, useCancelOrderMutation } from "../../../features/api/orderApi";
import LoadingPage from "../../../components/LoadingPage";
import ErrorPage from "../../../components/ErrorPage";

const CustomerOrders = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data: orders, isLoading, error, refetch } = useGetOrderByUserIdQuery(user?._id);
  const [cancelOrder] = useCancelOrderMutation();

  useEffect(() => {
    refetch();
  }, [orders])

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId).unwrap();
      refetch();
    } catch (error) {
      alert("Failed to cancel order. Please try again.");
    }
  };

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg pt-20 mb-150">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-center">
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
                <tr key={order._id} className="border hover:bg-gray-50">
                  <td className="p-3 text-center font-medium">{order._id}</td>
                  <td className="p-3 text-center font-semibold">₹{order.total.toFixed(2)}</td>
                  <td className={`p-3 text-center font-semibold ${
                    order.status === "Cancelled" ? "text-red-500" : "text-green-600"
                  }`}>{order.status}</td>
                  <td className="p-3 text-center text-gray-600">{format(new Date(order.createdAt), "dd MMM yyyy")}</td>
                  <td className="p-3 text-center">
                    {order.status !== "Cancelled" && (
                      <button 
                        onClick={() => handleCancelOrder(order._id)} 
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Cancel Order
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
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
