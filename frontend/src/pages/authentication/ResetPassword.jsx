import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../features/api/authApi";

const ResetPassword = () => {
    const { userId, token } = useParams(); // Get URL params
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await resetPassword({ userId, token, new_password: newPassword }).unwrap();
            toast.success(res.message);
            navigate("/login"); // Redirect to login page
        } catch (error) {
            toast.error(error.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold">Reset Password</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 p-2 bg-green-500 text-white rounded"
                >
                    {isLoading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
