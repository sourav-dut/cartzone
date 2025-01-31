import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <div className="text-2xl font-bold">E-Shop</div>
            <p className="mt-2 text-gray-400">
              Your one-stop shop for all things great! Explore top brands and products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Shop</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Categories</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Track Order</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Returns</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Help Center</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-8 text-center">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-900 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 E-Shop, All Rights Reserved.</p>
          <div className="space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
