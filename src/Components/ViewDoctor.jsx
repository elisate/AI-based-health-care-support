import React, { useEffect, useState } from 'react';
import { X, Mail, Phone, Award, FileText } from 'lucide-react';

const ViewDoctor= ({ doctorId, handleView }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchDoctorProfile = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommend/doctor/getDoctorById/${doctorId}`
      );
      const data = await response.json();

      if (data && data.doctor_id) {
        setProfileData(data);
      } else {
        console.error("Doctor data not found");
      }
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (doctorId) {
    fetchDoctorProfile();
  }
}, [doctorId]);


  if (!doctorId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="p-20 flex justify-center items-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : profileData ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Doctor Information</h2>
              <button
                onClick={handleView}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Profile & Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <img
                  src={profileData.profile_image_url}
                  alt="Doctor Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="flex-1 text-center sm:text-left">
                  <span span className="text-xl font-light text-gray-900 mb-2">
                    {profileData.email}
                  </span>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {profileData.specialty}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Age: {profileData.age}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {profileData.gender}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{profileData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{profileData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Professional Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Specialty</p>
                    <p className="font-medium text-gray-900 capitalize">{profileData.specialty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Special Notes</p>
                    <p className="font-medium text-gray-900 capitalize">{profileData.notes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Hospital ID</p>
                    <p className="font-mono text-sm text-gray-700 bg-white px-2 py-1 rounded border">
                      {profileData.hospital}
                    </p>
                  </div>
                </div>
              </div>

              {/* System Info */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  System Information
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Profile ID:</span>
                    <p className="font-mono bg-white px-2 py-1 rounded mt-1">{profileData.doctor_id}</p>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-xl">
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleView}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-red-600">Doctor profile not found.</div>
        )}
      </div>
    </div>
  );
};

export default ViewDoctor;
