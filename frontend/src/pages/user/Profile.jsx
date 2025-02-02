import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    profilePicture: 'https://via.placeholder.com/150',
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [orders] = useState([
    { id: 1, status: 'Shipped', items: ['Item 1', 'Item 2'], date: '2025-01-20' },
    { id: 2, status: 'Delivered', items: ['Item 3', 'Item 4'], date: '2025-01-18' },
    { id: 3, status: 'Pending', items: ['Item 5'], date: '2025-01-15' },
  ]);

  const [addresses, setAddresses] = useState([
    { id: 1, address: '123 Main St, City, Country' },
    { id: 2, address: '456 Another St, City, Country' },
  ]);

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, { id: addresses.length + 1, address: newAddress }]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex">

        {/* Sidebar */}
        <div className="bg-blue-600 w-64 h-screen p-6 text-white">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white"
            />
            <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
            <p className="text-sm">{user.email}</p>
          </div>
          
          <nav className="flex flex-col">
            <button
              onClick={() => setActiveTab('profile')}
              className={`text-white py-2 px-4 mb-2 rounded-md ${activeTab === 'profile' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`text-white py-2 px-4 mb-2 rounded-md ${activeTab === 'orders' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
            >
              Track Orders
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`text-white py-2 px-4 mb-2 rounded-md ${activeTab === 'addresses' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
            >
              Manage Addresses
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full p-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <label className="text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="mt-1 p-3 w-full md:w-2/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <label className="text-gray-600">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="mt-1 p-3 w-full md:w-2/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Track Orders</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-800">Order #{order.id}</h4>
                    <p>Status: <span className="font-semibold text-blue-600">{order.status}</span></p>
                    <p>Items: {order.items.join(', ')}</p>
                    <p>Date: {order.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Addresses</h2>
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <p>{addr.address}</p>
                  </div>
                ))}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Add new address"
                    className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddAddress(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
