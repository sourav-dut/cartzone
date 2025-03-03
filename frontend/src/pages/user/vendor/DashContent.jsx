import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 7000 },
  { month: "Mar", revenue: 6000 },
  { month: "Apr", revenue: 8000 },
  { month: "May", revenue: 9000 },
];

const recentOrders = [
  { id: "#001", customer: "Amit Sharma", total: "$120.50", status: "Completed" },
  { id: "#002", customer: "Rohit Kumar", total: "$80.00", status: "Pending" },
  { id: "#003", customer: "Sneha Patel", total: "$45.75", status: "Completed" },
  { id: "#004", customer: "Vikas Verma", total: "$230.00", status: "Cancelled" },
];

export default function DashContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <ShoppingCart size={32} className="text-blue-500" />
          <div>
            <p className="text-gray-500">Total Orders</p>
            <p className="text-xl font-semibold">1,245</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <Users size={32} className="text-green-500" />
          <div>
            <p className="text-gray-500">Customers</p>
            <p className="text-xl font-semibold">3,210</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <DollarSign size={32} className="text-yellow-500" />
          <div>
            <p className="text-gray-500">Revenue</p>
            <p className="text-xl font-semibold">$45,000</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <Package size={32} className="text-red-500" />
          <div>
            <p className="text-gray-500">Products</p>
            <p className="text-xl font-semibold">480</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.total}</td>
                <td className={`p-2 ${order.status === "Completed" ? "text-green-500" : order.status === "Pending" ? "text-yellow-500" : "text-red-500"}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
