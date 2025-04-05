import { useState, useRef, useEffect } from "react";
import { ShoppingCart, ChevronDown, User, Menu, X, ShoppingBag } from "lucide-react";
import { useGetUserQuery } from "../features/api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { logout, setCategory } from "../features/authSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetCartQuery } from "../features/api/cartApi";
import { useGetAllCategoryQuery } from "../features/api/categoryApi";
import LoadingPage from "./LoadingPage";
import { motion } from "framer-motion";
import { useGetAllProductsQuery, useSearchSuggestionQuery } from "../features/api/productApi";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Search Product
  const [search, setSearch] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Check the isLoggedIn and set IsLoggedIn
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
  const { data: getUser, isLoading, error, refetch } = useGetUserQuery(!token ? skipToken : undefined);
  console.log("getUser", getUser);

  const { data: getCart, isLoading: cartIsLoading, error: cartError } = useGetCartQuery(storedUser._id);
  const { data: allCategory, isLoading: categoryIsLoading, error: cateError } = useGetAllCategoryQuery();
  // const { data: searchSuggestions } = useSearchSuggestionQuery(search);

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

  if (isLoading || categoryIsLoading) return <LoadingPage />;
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

      <nav className="bg-white shadow-md p-4 fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer space-x-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/')}
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingBag className="text-cyan-900" size={25} />
            </motion.div>
            <motion.div
              className="text-2xl font-semibold text-cyan-900 tracking-tight font-[]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Cart<span className="text-cyan-600">zone</span>
            </motion.div>
          </motion.div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center border rounded-md overflow-hidden w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              value={search || ""} // Ensure value is always a string
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/products?search=${search}`);
                  setSearch(""); // Clear the search input after navigation
                }
              }}
              className="w-full px-2 py-1 outline-none"
            />

            <button onClick={() => {
              navigate(`/products?search=${search}`);
              setSearch(""); // Set to empty string instead of null
            }} className="px-4 bg-blue-500 text-white">
              Search
            </button>

          </div>

          {/* Suggestions Dropdown */}
          {/* {searchSuggestions && searchSuggestions.length > 0 && (
            <ul className="absolute bg-white shadow-lg rounded-md mt-1 w-full z-50">
              {searchSuggestions.map((s, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate(`/products?search=${s.title}`);
                    setSearch("");
                  }}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          )} */}

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
                aria-expanded={openDropdown === "category"}
              >
                Categories <ChevronDown size={16} />
              </button>

              {openDropdown === "category" && (
                <div
                  className="absolute left-0 mt-2 bg-white shadow-md rounded-md p-2 w-40 z-50"
                  role="menu"
                >
                  <ul className="space-y-2">
                    {allCategory?.categories?.length > 0 ? (
                      allCategory.categories.filter((category) => category.parent_id == null).map((category, index) => (
                        <li
                          key={index}
                          className="cursor-pointer hover:text-blue-500"
                          onClick={() => {
                            dispatch(setCategory({ isMainCategory: true, id: category._id, name: category.name }));
                            setOpenDropdown(null);
                            navigate("/products")
                          }}
                        // role="menuitem"
                        >
                          {category.name}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400">No categories available</li>
                    )}
                    <li className="cursor-pointer hover:text-blue-500" onClick={() => dispatch(setCategory({ isMainCategory: false, id: null, name: null }))}>Main Category</li>
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
                  <User size={20} /> {getUser?.user?.username || setIsLoggedIn(false)} <ChevronDown size={16} />
                </button>
                {openDropdown === "login" && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2 w-40">
                    <ul className="space-y-2">
                      <li onClick={() => {
                        setOpenDropdown(null)
                        navigate("/profile");
                      }} className="cursor-pointer hover:text-blue-500">
                        Profile
                      </li>
                      <li onClick={() => {
                        setOpenDropdown(null)
                        navigate(`/address/${getUser?.user?._id}`);
                      }} className="cursor-pointer hover:text-blue-500">
                        Address [Location]
                      </li>
                      <li onClick={() => {
                        setOpenDropdown(null)
                        navigate(`/order`)
                      }} className="cursor-pointer hover:text-blue-500">
                        Orders
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
            <div onClick={() => navigate(`/cart/${getUser?.user?._id}`)} className="relative cursor-pointer">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {getCart?.length}
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
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">{getCart?.length}</span>
          </div>
        </div>
      </div>
    </>
  );
}
