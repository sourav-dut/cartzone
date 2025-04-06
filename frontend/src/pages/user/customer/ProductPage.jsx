import { useGetAllProductsQuery } from "../../../features/api/productApi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCategory } from "../../../features/authSlice";
import { useEffect, useState, useMemo } from "react";
import { useGetAllCategoryQuery } from "../../../features/api/categoryApi";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllBrandQuery } from "../../../features/api/barndsApi";
import LoadingPage from "../../../components/LoadingPage";
import ErrorPage from "../../../components/ErrorPage";
import { Star } from "lucide-react";

const minPrice = 100;
const maxPrice = 500000;

export default function ProductPage() {
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [page, setPage] = useState(1);
  const limit = 12;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get the query from serach bar
  const searchQuery = searchParams.get("search") || "";

  // Scroll to top on mount & disable browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"; // Prevent browser from remembering the last position
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50); // Small delay ensures it works properly
  }, []);

  const { data: allProduct, isLoading, error, refetch } = useGetAllProductsQuery({ category: categoryId, brand: brandId, search: searchQuery, page, limit });
  const { data: allBrand, isLoading: isBrandLoading, error: brandError, refetch: brandRefetch } = useGetAllBrandQuery();
  const { data: all_categories, isLoading: isCategoryLoading, error: categoryError, refetch: categoryRefetch } = useGetAllCategoryQuery();

  const isCategory = useSelector((state) => state.auth.isMainCategory);
  const mainCategoryId = useSelector((state) => state.auth.mainCategoryId);
  const mainCategoryName = useSelector((state) => state.auth.mainCategoryName);

  // Search
  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery])

  // Category
  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
    categoryRefetch()
  };

  // Price Section
  const handleChange = (event, type) => {
    const value = Number(event.target.value);
    setPrice((prev) => (type === "min" ? [value, prev[1]] : [prev[0], value]));
  };
  const filteredProducts = useMemo(() => {
    return allProduct?.filter((product) => {
      return product.price >= price[0] && product.price <= price[1];
    });
  }, [allProduct, price]);

  // Reset All Filters
  const resetFilters = () => {
    navigate(0);
  };

  // Discount Price
  function calculateDiscountedPrice(originalPrice, discountPercent) {
    const discountAmount = (originalPrice * discountPercent) / 100;
    return Math.floor(originalPrice - discountAmount); // Returns the largest integer less than or equal to the result
  }


  if (isLoading || isCategoryLoading || isBrandLoading) return <LoadingPage />;
  if (error || brandError || categoryError) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-22">
      <div className="max-w-9xl flex gap-6">

        {/* Sidebar Filters */}
        <AnimatePresence>
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-1/4 bg-white p-4 rounded-lg shadow-md sticky"
          >

            {/* Category Section */}
            <h3 className="text-lg font-semibold mb-4">Filter By Category</h3>
            {isCategory && (
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => {
                    dispatch(setCategory({ isMainCategory: false, id: null, name: null }));
                    setCategoryId(null);
                    refetch();
                    categoryRefetch()
                  }}
                  className="text-lg transition-all duration-300 ease-out transform hover:scale-110 hover:text-blue-500"
                >
                  ←
                </button>
                <p className="font-semibold text-gray-800">{mainCategoryName}</p>
              </div>
            )}

            {all_categories?.categories?.length > 0 ? (
              isCategory ? (
                all_categories.categories
                  .filter((category) => category.parent_id?._id === mainCategoryId)
                  .map((category) => (
                    <label htmlFor={category._id} key={category._id} className="block">
                      <input
                        type="radio"
                        id={category._id}
                        name="category" // Ensures only one radio is selected
                        onChange={() => handleCategoryChange(category._id)}
                      />
                      <span className="ml-2">{category.name}</span>
                    </label>
                  ))
              ) : (
                all_categories.categories
                  .filter((category) => category.parent_id === null)
                  .map((category) => (
                    <label key={category._id} className="block hover:text-blue-500 cursor-pointer">
                      <div
                        className="ml-2"
                        onClick={() => {
                          dispatch(setCategory({ isMainCategory: true, id: category._id, name: category.name }));
                          setOpenDropdown(null);
                        }}
                      >
                        {category.name}
                      </div>
                    </label>
                  ))
              )
            ) : (
              <p className="text-gray-500">No categories available</p>
            )}


            {/* Brand Section */}
            <h3 className="text-lg font-semibold mt-6 mb-4">Filter By Brand</h3>
            <label className="block">
              <input
                type="radio"
                name="brand"
                onChange={() => setBrandId(null)}
              />
              <span className="ml-2">None</span>
            </label>
            {allBrand?.brands?.map((brand) => (
              <label key={brand._id} className="block">
                <input
                  type="radio"
                  name="brand"
                  onChange={() => setBrandId(brand._id)}
                />
                <span className="ml-2">{brand.brand_name}</span>
              </label>
            ))}


            {/* Price Section */}
            <h3 className="text-lg font-semibold mt-6 mb-4">Filter By Price</h3>
            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
              <span>₹{price[0]}</span>
              <span>₹{price[1]}</span>
            </div>

            {/* Min Price Slider */}
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price[0]}
              onChange={(e) => handleChange(e, "min")}
              className="w-full cursor-pointer accent-blue-500"
            />
            {/* Max Price Slider */}
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price[1]}
              onChange={(e) => handleChange(e, "max")}
              className="w-full cursor-pointer accent-blue-500"
            />

            <button
              onClick={resetFilters}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              aria-label="Reset all filters"
            >
              Reset Filters
            </button>
          </motion.aside>
        </AnimatePresence>


        {/* Product Display */}
        {/* Product Display */}
        <div className="w-3/4">
          {filteredProducts?.length === 0 && (
            <p className="text-gray-600 text-center">No products found.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                key={product._id}
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition p-4 cursor-pointer flex flex-col justify-between group"
              >
                <img src={product.images[0]} alt={product.title} className="h-40 w-full object-contain" />
                <h3 className="mt-2 text-sm font-semibold line-clamp-2 group-hover:text-blue-500">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      ₹{calculateDiscountedPrice(product.price, product.discountPercentage)}
                    </p>
                    <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
                    <p className="text-sm text-green-600 font-semibold">
                      {product.discountPercentage}% Off
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
                  ))}
                  <span className="text-gray-500 text-xs ml-1">(120 reviews)</span>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          {/* {allProduct?.totalPages > 1 && ( */}
            {allProduct.length > 10 ? (
              <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-gray-700 font-medium">
                Page {page} of {allProduct?.totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === allProduct?.totalPages}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
            ) : (<></>)}
          {/* )} */}

        </div>
      </div>
    </div>
  );
}
