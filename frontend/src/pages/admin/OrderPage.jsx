import React, {useState} from "react";
import { format } from "date-fns";
import { useGetOrderQuery, useUpdateOrderMutation } from "../../features/api/orderApi";

const OrderPage = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrderQuery();
  const [updateOrderStatus] = useUpdateOrderMutation();

  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (orderId, updateStatus) => {
    if (isUpdating) return; // Prevent multiple updates
    setIsUpdating(true);
    
    try {
      await updateOrderStatus({ orderId, updateStatus }).unwrap();
      refetch();
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading orders</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Total (₹)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border">
                  <td className="p-3 text-center">{order._id}</td>
                  <td className="p-3 text-center">{order.user_id?.username || "N/A"}</td>
                  <td className="p-3 text-center">₹{order.total.toFixed(2)}</td>
                  <td className="p-3 text-center">{order.status}</td>
                  <td className="p-3 text-center">{format(new Date(order.createdAt), "dd MMM yyyy")}</td>
                  <td className="p-3 text-center">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="p-2 border rounded-lg"
                      disabled={isUpdating} // Disable dropdown when updating
                    >
                      {["Pending", "Processing", "Shipped", "Out for delivery", "Delivered", "Cancelled"].map((status) => (
                        <option key={status} value={status} disabled={order.status === status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
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

export default OrderPage;
