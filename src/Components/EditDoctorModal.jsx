import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  User,
  Mail,
  Phone,
  StickyNote,
  Stethoscope,
  CircleUser,
  Image as ImageIcon,
} from "lucide-react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const EditDoctorModal = ({ doctorId, handleCloseUpdate }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    notes: "",
    specialty: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!doctorId) return;

    fetch(`http://127.0.0.1:8000/recommend/doctor/getDoctorById/${doctorId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setFormData({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            age: data.age || "",
            gender: data.gender || "",
            phone: data.phone || "",
            email: data.email || "",
            notes: data.notes || "",
            specialty: data.specialty || "",
          });

          if (data.profile_image_url) {
            setPreviewImageUrl(data.profile_image_url);
          } else {
            setPreviewImageUrl(null);
          }

          setProfileImageFile(null);
        } else {
          alert(data.error);
        }
      })
      .catch(() => alert("Failed to fetch doctor data"));
  }, [doctorId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (profileImageFile) {
        data.append("profile_image", profileImageFile);
      }

      const response = await fetch(
        `http://127.0.0.1:8000/recommend/UpdateById/${doctorId}`,
        {
          method: "PUT",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        Notify.success("Doctor updated successfully");
        handleCloseUpdate();
      } else {
        console.error(`Error: ${result.error}`);
        Notify.failure(result.error || "Update failed");
      }
    } catch (err) {
      console.error("Error:", err);
      Notify.failure("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 text-blue-700">
            <CircleUser className="w-6 h-6" />
            Edit Doctor
          </h2>
          <button
            onClick={handleCloseUpdate}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <X className="text-gray-600" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={formData.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={formData.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder="Age"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email Address"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Special Notes"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="text-sm font-medium text-gray-700">Specialty</label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => handleChange("specialty", e.target.value)}
              placeholder="Doctor's Specialty"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {/* Preview */}
          {previewImageUrl && (
            <div className="mt-2">
              <img
                src={previewImageUrl}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={handleCloseUpdate}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 disabled:opacity-50"
            disabled={saving}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDoctorModal;
