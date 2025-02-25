import { useState, useRef, useEffect } from "react";
import { ShoppingCart, ChevronDown, User, Menu, X } from "lucide-react";
import { useGetUserQuery } from "../features/api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { logout } from "../features/authSlice";
import { skipToken } from "@reduxjs/toolkit/query";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // import authApi
  // If someCondition is true, the query will receive skipToken, preventing the API call.
  // If someCondition is false, it will proceed with fetching the data.
  const { data: getUser, isLoading, error } = useGetUserQuery(!token ? skipToken : undefined);
  // console.log(getUser);

  // logout user
  const userLogout = () => {
    dispatch(logout());
    window.location.reload();
  }

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <p>Loading users...</p>;
  // if (error) return <p>Error fetching users.</p>;

  return (
    <>
      {/* Backdrop Overlay for Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}

      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="text-2xl font-bold">E-Shop</div>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden md:flex items-center border rounded-md overflow-hidden w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-2 py-1 outline-none"
            />
            <button className="px-4 bg-blue-500 text-white">Search</button>
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center gap-6 relative"
            ref={dropdownRef}
          >
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("category")}
                className="flex items-center gap-1"
              >
                Categories <ChevronDown size={16} />
              </button>
              {openDropdown === "category" && (
                <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md p-2 w-40">
                  <ul className="space-y-2">
                    <li className="cursor-pointer hover:text-blue-500">
                      Electronics
                    </li>
                    <li className="cursor-pointer hover:text-blue-500">
                      Fashion
                    </li>
                    <li className="cursor-pointer hover:text-blue-500">
                      Home & Kitchen
                    </li>
                    <li className="cursor-pointer hover:text-blue-500">Books</li>
                  </ul>
                </div>
              )}
            </div>

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("more")}
                className="flex items-center gap-1"
              >
                More <ChevronDown size={16} />
              </button>
              {openDropdown === "more" && (
                <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md p-2 w-40">
                  <ul className="space-y-2">
                    <li className="cursor-pointer hover:text-blue-500">Offers</li>
                    <li className="cursor-pointer hover:text-blue-500">
                      Customer Support
                    </li>
                    <li className="cursor-pointer hover:text-blue-500">
                      Gift Cards
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Login Dropdown */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("login")}
                  className="flex items-center gap-1"
                >
                  <User size={20} /> {getUser?.user?.username || "User"} <ChevronDown size={16} />
                </button>
                {openDropdown === "login" && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2 w-40">
                    <ul className="space-y-2">
                      <li className="cursor-pointer hover:text-blue-500">
                        Profile
                      </li>
                      <li onClick={userLogout} className="cursor-pointer hover:text-blue-500">
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-1"
                >
                  <User size={20} /> Login
                </button>
              </div>
            )}

            {/* Cart */}
            <div className="relative cursor-pointer">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                2
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slide in from Left */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMobileMenu}
          className="absolute top-4 right-4 text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Menu Items */}
        <div className="mt-6 flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="flex items-center border rounded-md overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-2 py-1 outline-none"
            />
            <button className="px-4 bg-blue-500 text-white">Search</button>
          </div>

          {/* Categories */}
          <button
            onClick={() => toggleDropdown("category")}
            className="flex items-center gap-1"
          >
            Categories <ChevronDown size={16} />
          </button>
          {openDropdown === "category" && (
            <div className="bg-gray-100 rounded-md p-2 w-full">
              <ul className="space-y-2">
                <li className="cursor-pointer hover:text-blue-500">Electronics</li>
                <li className="cursor-pointer hover:text-blue-500">Fashion</li>
                <li className="cursor-pointer hover:text-blue-500">
                  Home & Kitchen
                </li>
                <li className="cursor-pointer hover:text-blue-500">Books</li>
              </ul>
            </div>
          )}

          {/* More */}
          <button onClick={() => toggleDropdown("more")} className="flex items-center gap-1">
            More <ChevronDown size={16} />
          </button>
          {openDropdown === "more" && (
            <div className="bg-gray-100 rounded-md p-2 w-full">
              <ul className="space-y-2">
                <li className="cursor-pointer hover:text-blue-500">Offers</li>
                <li className="cursor-pointer hover:text-blue-500">Customer Support</li>
                <li className="cursor-pointer hover:text-blue-500">Gift Cards</li>
              </ul>
            </div>
          )}

          {/* Cart */}
          <div className="relative cursor-pointer">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
          </div>
        </div>
      </div>
    </>
  );
}
