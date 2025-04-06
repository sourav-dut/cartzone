import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBox, FiUsers, FiShoppingCart } from "react-icons/fi";

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FiHome /> },
    { name: "Product", path: "/admin/product", icon: <FiHome /> },
    { name: "Orders", path: "/admin/orders", icon: <FiShoppingCart /> },
    { name: "Customers", path: "/admin/all-users", icon: <FiUsers /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-gray-200 p-5">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Panel</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;