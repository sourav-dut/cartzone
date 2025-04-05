import { useState } from "react";
import { useGetAllCategoryQuery, useGetAllSubSubCategoryQuery } from "../../../features/api/categoryApi";
import NotFound from "../../../components/NotFound";
import { useGetAllBrandQuery } from "../../../features/api/barndsApi";
import { useCreateProductMutation, useGetAllProductsQuery } from "../../../features/api/productApi";
import { toast } from 'react-toastify';
import { useUploadImagesMutation } from "../../../features/api/cloudApi";

export default function Product() {
    const { data: all_categories, isLoading: isCategoryLoading, error } = useGetAllCategoryQuery();
    if (!isCategoryLoading) console.log(all_categories.categories)
    const { data: getAllBrand, isLoading: isBrandLoading, error: brandError } = useGetAllBrandQuery();
    const { data: getAllProducts, isLoading: productLoading, error: productError, refetch } = useGetAllProductsQuery();
    if (!productLoading) console.log(getAllProducts);
    
    const [createProduct] = useCreateProductMutation();
    const [uploadImages, { isLoading: imageIsLoading }] = useUploadImagesMutation();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        discountPercentage: "",
        stockQuantity: "",
        price: "",
        category_id: "",
        brand_id: "",
        images: [],
    });


    if (isCategoryLoading || isBrandLoading) return <p>Loading...</p>;
    if (error) return <NotFound />;

    console.log(getAllProducts);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        setFormData({ ...formData, category_id: e.target.value });
    };

    const handleBrandChange = (e) => {
        setFormData({ ...formData, brand_id: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagesArray = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...imagesArray], // Append new images
        }));
    };

    const handleRemoveImage = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, i) => i !== index),
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.images.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }
    
        try {
            // Create FormData for images
            const imageFormData = new FormData();
            formData.images.forEach((image) => {
                imageFormData.append("images", image.file);
            });
    
            // Upload images to Cloudinary
            const uploadedImages = await uploadImages(imageFormData).unwrap();
    
            // Check if the response is an array or an object
            console.log("Uploaded Images Response:", uploadedImages);
    
            let imageUrls = [];
            if (Array.isArray(uploadedImages)) {
                imageUrls = uploadedImages.map((img) => img.url);
            } else if (uploadedImages && uploadedImages.urls) {
                // Adjust if response structure is { urls: [...] }
                imageUrls = uploadedImages.urls;
            } else {
                throw new Error("Unexpected response format from image upload API");
            }
    
            // Create the product data object
            const productData = {
                title: formData.title,
                description: formData.description,
                discountPercentage: formData.discountPercentage,
                stockQuantity: formData.stockQuantity,
                price: formData.price,
                category_id: formData.category_id,
                brand_id: formData.brand_id,
                images: imageUrls, // Use the extracted URLs
            };
    
            // Send product data to backend
            await createProduct(productData).unwrap();
            toast.success("Product added successfully!");
    
            // Reset form
            setFormData({
                title: "",
                description: "",
                discountPercentage: "",
                stockQuantity: "",
                price: "",
                category_id: "",
                brand_id: "",
                images: [],
            });
            refetch();
        } catch (error) {
            console.error("Upload Error:", error);
            toast.error("Failed to add product.");
        }
    };    
    

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Add Product Form */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Add Product</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-600">Product Name</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg mt-1"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600">Product Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg mt-1"
                                required
                            />
                        </div>

                        <div className="flex gap-10">
                            <div>
                                <label className="block text-gray-600">Discount</label>
                                <input
                                    type="text"
                                    name="discountPercentage"
                                    value={formData.discountPercentage}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Stock Quantity</label>
                                <input
                                    type="text"
                                    name="stockQuantity"
                                    value={formData.stockQuantity}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg mt-1"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg mt-1"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold">Select Category</label>
                            <select
                                className="border rounded-lg p-2 w-full"
                                value={formData.category_id}
                                onChange={handleCategoryChange}
                                required
                            >
                                <option value="">-- Select a Category --</option>
                                {all_categories?.categories?.filter((category) => category.parent_id != null).map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold">Select Brand</label>
                            <select
                                className="border rounded-lg p-2 w-full"
                                value={formData.brand_id}
                                onChange={handleBrandChange}
                                required
                            >
                                <option value="">-- Select a Brand --</option>
                                {brandError
                                    ? null
                                    : getAllBrand?.brands?.map((brand) => (
                                        <option key={brand._id} value={brand._id}>
                                            {brand.brand_name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-600">Product Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="w-full p-2 border rounded-lg mt-1"
                                required
                            />
                        </div>

                        {formData.images.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img src={image.preview} className="w-24 h-24 object-cover rounded-lg" alt="Preview" />
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0  text-red rounded-full p-1"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {imageIsLoading ? (
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
                            Loading......
                        </button>
                        ) : (
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
                            Upload Product
                        </button>
                        )}
                    </form>
                </div>
                {/* Product List */}
                {productLoading ? (
                    <>Loading...........</>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">All Products</h3>
                        {getAllProducts?.length === 0 ? (
                            <p className="text-gray-500">No products added yet.</p>
                        ) : (

                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-2">Images</th>
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Price</th>
                                        <th className="p-2">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getAllProducts.map((product, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-2 flex gap-2">
                                                {/* {product.images.map((image, imgIndex) => (
                                                    <img key={imgIndex} src={image} className="w-12 h-12 object-cover rounded-lg" alt="Product image" />
                                                ))} */}
                                                <img src={product.images[0]} className="w-12 h-12 object-cover rounded-lg" alt="Product image" />
                                            </td>
                                            <td className="p-2">{product.title}</td>
                                            <td className="p-2">₹{product.price}</td>
                                            <td className="p-2">{product.category_id.name}</td>
                                            <td className="text-red-500 cursor-pointer">Delete</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
