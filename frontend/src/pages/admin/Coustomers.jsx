import React from "react";
import { useGetAllUsersQuery } from "../../features/api/userApi";
import LoadingPage from "../../components/LoadingPage";
import ErrorPage from "../../components/ErrorPage";

const Coustomers = () => {
  const { data: allUsers, isLoading, error } = useGetAllUsersQuery();
  if (!isLoading) console.log(allUsers);
  

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">User ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.users?.length > 0 ? (
              allUsers?.users.map((user) => (
                <tr key={user._id} className="border hover:bg-gray-100 transition">
                  <td className="p-3 text-center">{user._id}</td>
                  <td className="p-3 text-center">{user.username}</td>
                  <td className="p-3 text-center">{user.email}</td>
                  <td className="p-3 text-center">{user.userRole}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coustomers;
