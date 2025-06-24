import React, { useState } from "react";
import {
  X,
  Save,
  User,
  Mail,
  Phone,
  Award,
  Clock,
  Plus,
  Trash2,
  MapPin,
} from "lucide-react";

const EditDoctorModal = ({ handleCloseUpdate}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Initial data
  const initialData = {
    age: "23",
    gender: "Male",
    phone: "0787239952",
    email: "elisadush2000@gmail.com",
    notes: "special in surgery",
    specialty: "nursing",
    certifications: [],
    available_times: [],
    hospital: "6852d3e0fe35fb6b99383cc1",
  };

  const [formData, setFormData] = useState(initialData);
  const [newCertification, setNewCertification] = useState("");
  const [newAvailableTime, setNewAvailableTime] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()],
      }));
      setNewCertification("");
    }
  };

  const removeCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const addAvailableTime = () => {
    if (newAvailableTime.trim()) {
      setFormData((prev) => ({
        ...prev,
        available_times: [...prev.available_times, newAvailableTime.trim()],
      }));
      setNewAvailableTime("");
    }
  };

  const removeAvailableTime = (index) => {
    setFormData((prev) => ({
      ...prev,
      available_times: prev.available_times.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (
      isNaN(formData.age) ||
      parseInt(formData.age) < 18 ||
      parseInt(formData.age) > 100
    ) {
      newErrors.age = "Age must be between 18 and 100";
    }

    if (!formData.specialty.trim()) {
      newErrors.specialty = "Specialty is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Saving data:", formData);
      // Here you would typically make an API call to save the data
      setIsOpen(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setNewCertification("");
    setNewAvailableTime("");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-500" />
              Edit Doctor Profile
            </h2>
            <button
              onClick={ handleCloseUpdate}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.age ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter age"
                    />
                    {errors.age && (
                      <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialty
                    </label>
                    <input
                      type="text"
                      value={formData.specialty}
                      onChange={(e) =>
                        handleInputChange("specialty", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.specialty ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g., Nursing, Cardiology"
                    />
                    {errors.specialty && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.specialty}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Professional Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Enter special notes or qualifications"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hospital ID
                    </label>
                    <input
                      type="text"
                      value={formData.hospital}
                      onChange={(e) =>
                        handleInputChange("hospital", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="Enter hospital ID"
                    />
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a certification"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addCertification())
                      }
                    />
                    <button
                      type="button"
                      onClick={addCertification}
                      className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded-md border"
                      >
                        <span className="text-sm">{cert}</span>
                        <button
                          type="button"
                          onClick={() => removeCertification(index)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Available Times */}
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  Available Times
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAvailableTime}
                      onChange={(e) => setNewAvailableTime(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Monday 9:00 AM - 5:00 PM"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addAvailableTime())
                      }
                    />
                    <button
                      type="button"
                      onClick={addAvailableTime}
                      className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.available_times.map((time, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded-md border"
                      >
                        <span className="text-sm">{time}</span>
                        <button
                          type="button"
                          onClick={() => removeAvailableTime(index)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-xl">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDoctorModal;
