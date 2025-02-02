import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useRegisterMutation } from "../../features/api/authApi";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [ register, {isLoading, error}] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation (you can modify based on your requirements)
    if (!username || !email || !phone || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    const response = await register({username, email, phone, password}).unwrap();
    console.log(response);
    dispatch(setCredentials(response));
    toast.success("User created");
    navigate("/");

    // Reset error message on successful form submission
    setErrorMessage("");

    // Here you can handle login (API call or any other logic)
    console.log("Logging in with:", email, password);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || 'Something went wrong'}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Left Side Image */}
        <div className="w-1/2 bg-cover bg-center rounded-l-lg" style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5598.jpg?t=st=1738220393~exp=1738223993~hmac=6c2da7a4efe998e8f94fb8607d3a7dfbb146f8ba54b0d941161714fbd3790622&w=740")' }}></div>

        {/* Right Side Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-center mb-6">Signup</h2>

          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-2 rounded-md mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Phone no
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your ph no"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <NavLink to="/login" className="text-blue-500 hover:underline">
                Register here
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
