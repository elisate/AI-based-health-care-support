import React, { useEffect, useState } from "react";
import { CalendarDays, Eye } from "lucide-react";
import "../dashboardstyles/table.css";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";

const GeneralDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const handleViewDoctor = (doctor_id) => {
    navigate(`/singleDoctor/${doctor_id}`);
  };

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/recommend/getAllDoctors`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setDoctors(res.data.doctors || []);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        Notify.failure("Failed to load doctors");
      }
    };

    getAllDoctors();
  }, []);

  const totalPages = Math.ceil(doctors.length / itemsPerPage);
  const paginatedDoctors = doctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-16 rounded-xl shadow-lg bg-white text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarDays size={28} className="text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Registered Doctors
            </h1>
          </div>

          <div className="text-base md:text-lg font-medium text-gray-500">
            Total: {doctors.length}
          </div>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No doctors found.</div>
        ) : (
          <>
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400">
              <table className="min-w-[800px] w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tl-lg bg-blue-500 text-white">
                      Name
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider hidden md:table-cell bg-blue-500 text-white">
                      Email
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider bg-blue-500 text-white">
                      Specialty
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tr-lg bg-blue-500 text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedDoctors.map((doctor, idx) => (
                    <tr
                      key={doctor.doctor_id || idx}
                      className={`transition-colors ${
                        idx % 2 === 0
                          ? "bg-blue-50 hover:bg-blue-100"
                          : "bg-white hover:bg-blue-50"
                      }`}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={doctor.profile_image_url || "https://via.placeholder.com/40"}
                            alt="profile"
                            className="h-10 w-10 rounded-full object-cover bg-blue-100 text-blue-600"
                          />
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {truncateText(`${doctor.firstname || ""} ${doctor.lastname || ""}`, 20)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-600">
                          {truncateText(doctor.email)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap capitalize text-sm text-gray-700">
                        {truncateText(doctor.specialty || "N/A")}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div
                          className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 transition"
                          onClick={() => handleViewDoctor(doctor.doctor_id)}
                        >
                          <Eye size={16} className="mr-1" />
                          <span className="text-sm">View</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap justify-center items-center mt-6 gap-2 md:gap-4">
              <div
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 bg-white cursor-pointer hover:scale-105 transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-200 transform-none shadow-none cursor-not-allowed"
                    : ""
                }`}
                onClick={handlePrevPage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Previous
              </div>

              <div className="flex items-center gap-1 text-sm md:text-base">
                Page <span className="font-bold">{currentPage}</span> of {totalPages}
              </div>

              <div
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 bg-white cursor-pointer hover:scale-105 transition-all duration-300 ${
                  currentPage === totalPages
                    ? "bg-gray-200 transform-none shadow-none cursor-not-allowed"
                    : ""
                }`}
                onClick={handleNextPage}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneralDoctors;
