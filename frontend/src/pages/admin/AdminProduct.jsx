import React from 'react';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../features/api/productApi';

const ProductPage = () => {
    const { data: products, isLoading, error } = useGetAllProductsQuery();
    if (!isLoading) {
        console.log(products);

    }
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id).unwrap();
        }
    };

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>Error fetching products</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products?.map((product) => (
                    <div key={product._id} className="relative p-4 shadow-md border rounded-md">
                        <div>
                            <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover rounded-md" />
                            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                            <p className="text-gray-600">${product.price}</p>
                            <button
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
                                onClick={() => handleDelete(product._id)}
                            >
                                &#128465;
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
