import React, { useState } from 'react';
import { useCreateAddressMutation, useDeleteAddressMutation, useGetAddressQuery } from '../../features/api/addressApi';
import { useParams } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';

const Address = () => {
    const { userId } = useParams();
    const { data: addresses, isLoading, error, refetch } = useGetAddressQuery(userId);
    if (!isLoading) {
        console.log(addresses);
    }
      const [deleteAddress] = useDeleteAddressMutation();
    const [addAddress] = useCreateAddressMutation();

    const [newAddress, setNewAddress] = useState({ phoneNumber: '', street: '', city: '', state: '', pinCode: '', country: '' });

      const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this address?')) {
          await deleteAddress(id).unwrap();
          refetch();
        }
      };

    const handleAdd = async (e) => {
        e.preventDefault();
        await addAddress(newAddress);
        setNewAddress({ phoneNumber: '', street: '', city: '', state: '', pinCode: '', country: '' });
        refetch();
    };

    if (isLoading) return <LoadingPage />;
    if (error) return <Error />;

    return (
        <div className="p-6 pt-20">
            <h1 className="text-2xl font-bold mb-4">Saved Addresses</h1>
            <form onSubmit={handleAdd} className="mb-6 p-4 border rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">Add New Address</h2>
                <input type="tel" placeholder="Phone" value={newAddress.phoneNumber} onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })} className="block w-full mb-2 p-2 border rounded" required />
                <input type="text" placeholder="street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} className="block w-full mb-2 p-2 border rounded" required />
                <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="block w-full mb-2 p-2 border rounded" required />
                <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} className="block w-full mb-2 p-2 border rounded" required />
                <input type="text" placeholder="Pincode" value={newAddress.pinCode} onChange={(e) => setNewAddress({ ...newAddress, pinCode: e.target.value })} className="block w-full mb-2 p-2 border rounded" required />
                <input type="text" placeholder="Country" value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} className="block w-full mb-2 p-2 border rounded" required />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md">Add Address</button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {addresses?.map((address) => (
                    <div key={address._id} className="border p-4 rounded-md shadow-md relative">
                        <p><strong>Name:</strong> {address.user_id.username}</p>
                        <p><strong>Phone:</strong> {address.phoneNumber}</p>
                        <p><strong>Address:</strong> {address.street}, {address.city}, {address.state}, {address.pinCode}</p>
                        <button
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
                            onClick={() => handleDelete(address._id)}
                        >
                            &#128465;
                        </button>
                    </div>
                ))}
                <h1>Get Address</h1>
            </div>
        </div>
    );
};

export default Address;
