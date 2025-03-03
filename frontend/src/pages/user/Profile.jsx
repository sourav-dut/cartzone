import { useState } from "react";
import { Edit, Save, User } from "lucide-react";
import { useGetUserQuery, useUpdateUserMutation } from "../../features/api/userApi";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const {data: userProfile, isLoading, error, refetch} = useGetUserQuery();
  console.log(userProfile);
  const [updateUser, {isLoading: updateIsLoading}] = useUpdateUserMutation();
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const response = await updateUser(formData).unwrap();
    console.log(response);
    setIsEditing(false);
    refetch();
  };

  if (isLoading) return <p className="text-green-600">Loading.......................</p>
  if (error) return <p className="text-red-600">Error</p>

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex flex-col items-center gap-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJIwASCJpICHRbFDOQXQ2S-pmikc8vs6K2GA&s"
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              placeholder={userProfile?.user?.username}
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="email"
              name="email"
              placeholder={userProfile?.user?.email}
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="phone"
              placeholder={userProfile?.user?.phone}
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleSave}
              className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-green-600"
            >
              <Save size={20} /> Save
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{userProfile?.user?.username}</h2>
            <p className="text-gray-600">{userProfile?.user?.email}</p>
            <p className="text-gray-600">{userProfile?.user?.phone}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-600"
            >
              <Edit size={20} /> Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}
