import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react'; // Optional icon, feel free to change it

export default function ChangePassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setMessage(" Email not found. Please request a reset again.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/recommend/ChangePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          otp,
          new_password: newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(" Password changed successfully. Redirecting...");
        sessionStorage.removeItem("resetEmail");
        setTimeout(() => {
          navigate("/welcome");
        }, 2000);
      } else {
        setMessage(` ${data.error || "Password reset failed."}`);
      }
    } catch (error) {
      setMessage(" Network error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        
        {/* ✅ Header Section with Icon */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={20} className="text-white" />
            <h2 className="text-lg font-semibold">Change Your Password</h2>
          </div>
        </div>

        {/* ✅ Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 border bg-gray-100 rounded-lg text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">OTP Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter the 6-digit OTP"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? "Submitting..." : "Change Password"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm font-medium text-blue-600 mt-2 mb-4">{message}</p>
        )}
      </div>
    </div>
  );
}
