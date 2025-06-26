import { useState } from 'react';
import { Mail, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Import this

export default function RequestReset() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ Hook for redirect

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/recommend/requestReset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("resetEmail", email); // ✅ Store email in session
        setMessage("OTP sent to your email.");
        setTimeout(() => navigate("/changePassword"), 1500); // ✅ Redirect after delay
      } else {
        setMessage(` ${data.error || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage("Network error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
            
            <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Request Password Reset</h2>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex justify-center mb-2">
                <div className="bg-blue-500 rounded-lg p-3">
                  <Mail className="text-white" size={24} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {message && (
                <p className="text-sm text-center font-medium text-blue-600">
                  {message}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Requesting..." : "Request OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
