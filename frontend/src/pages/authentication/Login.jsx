import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForgotPasswordMutation, useLoginMutation } from "../../features/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();
  const [forgotPasswordMutation, { isLoading: isPasswordLoading, error: paswordError }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation (you can modify based on your requirements)
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    const response = await login({ email, password }).unwrap();
    console.log(response);
    if (response) {
      dispatch(setCredentials(response));
      toast.success("User logged in");
      navigate("/");
      window.location.reload();
    } else {
      toast.error("Somthing Wrong!@")
    }

    // Reset error message on successful form submission
    setErrorMessage("");

    // Here you can handle login (API call or any other logic)
    console.log("Logging in with:", email, password);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPasswordMutation({ email }).unwrap();
      toast.success(res.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  }

  if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.data?.message || 'Something went wrong'}</p>;


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Left Side Image */}
        <div className="w-1/2 bg-cover bg-center rounded-l-lg" style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5598.jpg?t=st=1738220393~exp=1738223993~hmac=6c2da7a4efe998e8f94fb8607d3a7dfbb146f8ba54b0d941161714fbd3790622&w=740")' }}></div>

        {/* Right Side Login Form */}
        {forgotPassword ? (
          <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold">Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit} className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                disabled={isPasswordLoading}
                className="w-full mt-4 p-2 bg-blue-500 text-white rounded"
              >
                {isPasswordLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <button onClick={() => setForgotPassword(false)} className="mt-2 text-blue-500 hover:underline">
              Back to Login
            </button>
          </div>
        ) : (
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

            {errorMessage && (
              <div className="bg-red-100 text-red-800 p-2 rounded-md mb-4 text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
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
            <div className="mt-4 flex gap-5">
              <NavLink to="" onClick={() => setForgotPassword(true)} className="text-blue-500 hover:underline">
                Forgot Password
              </NavLink>
              <p className="text-sm">
                Don't have an account?{" "}
                <NavLink to="/signup" className="text-blue-500 hover:underline">
                  Register here
                </NavLink>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
