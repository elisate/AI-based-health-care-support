import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Phone, Stethoscope, Calendar, UserCheck } from "lucide-react";

const DoctorDash = () => {
  
  const [loading, setLoading] = useState(true);


   const [doctor, setDoctor] = useState([]);
  const userToken = JSON.parse(localStorage.getItem("userToken")); // Get token from localStorage
  const doctorId=userToken.role_data.id
  const Fname=userToken.user.firstname;
  const Lname=userToken.user.lastname;
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/recommend/doctor/getDoctorById/${doctorId}`
        );

        const data = response.data;

        // Create full name fallback if not present
        const fullName = data.full_name || `${data.firstname} ${data.lastname}`;

        // Map backend fields to match your frontend design
        const mappedDoctor = {
          userName: fullName,
          profileImage: data.profile_image_url,
          Speciality: data.specialty,
          userDescription: data.notes,
          userEmail: data.email,
          phoneNumber: data.phone,
          Gender: data.gender,
          userAge: data.age,
        };

        setDoctor(mappedDoctor);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    getDoctor();
  }, [doctorId]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading doctor information...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
            <p className="text-gray-600">Unable to load doctor information. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  // 👇 Your entire UI remains untouched and still uses `doctor` from API
  return (
<div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 overflow-x-auto">

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {Fname} {Lname}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-center">
                <div className="relative inline-block">
                  <img
                    src={doctor.profileImage}
                    alt="Doctor Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                </div>
                <h2 className="text-2xl font-bold text-white mt-4 mb-2">{doctor.userName}</h2>
                <div className="inline-flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Stethoscope className="w-4 h-4 mr-1" />
                  {doctor.Speciality}
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {doctor.userDescription}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <Mail className="w-4 h-4 mr-3 text-blue-600" />
                    <a href={`mailto:${doctor.userEmail}`} className="text-sm hover:underline">
                      {doctor.userEmail}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-blue-600" />
                    <span className="text-sm">{doctor.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <InfoItem icon={<User className="w-5 h-5 text-blue-600" />} label="Full Name" value={doctor.userName} />
                    <InfoItem icon={<UserCheck className="w-5 h-5 text-blue-600" />} label="Gender" value={doctor.Gender} />
                    <InfoItem icon={<Calendar className="w-5 h-5 text-blue-600" />} label="Age" value={`${doctor.userAge} years`} />
                  </div>
                  <div className="space-y-4">
                    <InfoItem icon={<Phone className="w-5 h-5 text-blue-600" />} label="Phone Number" value={doctor.phoneNumber} />
                    <InfoItem icon={<Mail className="w-5 h-5 text-blue-600" />} label="Email Address" value={doctor.userEmail} />
                    <InfoItem icon={<Stethoscope className="w-5 h-5 text-blue-600" />} label="Speciality" value={doctor.Speciality} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickStat icon={<User className="w-6 h-6 text-blue-600" />} title="150+" subtitle="Patients Treated" />
          <QuickStat icon={<Calendar className="w-6 h-6 text-blue-600" />} title="15+" subtitle="Years Experience" />
          <QuickStat icon={<Stethoscope className="w-6 h-6 text-blue-600" />} title="98%" subtitle="Success Rate" />
        </div>
      </div>
    </div>
  );
};

// Component to avoid repeating info blocks
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="bg-blue-100 p-2 rounded-lg mr-4">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

// Component for quick stat cards
const QuickStat = ({ icon, title, subtitle }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{title}</h3>
    <p className="text-gray-600">{subtitle}</p>
  </div>
);

export default DoctorDash;
