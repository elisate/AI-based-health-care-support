import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import "../dashboardstyles/table.css";
import { Edit2, X, Eye } from "lucide-react";

const SAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPatients = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const hospitalId = userToken?.user?.hospital_id;

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/recommend/Appointment/getPatientByHospId/${hospitalId}`
        );
        const data = await response.json();

        if (data.patients && Array.isArray(data.patients)) {
          setPatients(data.patients);
          setTotalPatients(data.patients.length);
        } else {
          setPatients([]);
          setTotalPatients(0);
        }
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        setPatients([]);
        setTotalPatients(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = patients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(patients.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-16 rounded-xl shadow-lg bg-white text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarDays size={28} className="text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Patients List
            </h1>
          </div>
          <div className="text-base md:text-lg font-medium text-gray-500">
            Total: {totalPatients}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400">
              <table className="min-w-[800px] w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left rounded-tl-lg">
                      Profile
                    </th>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left">
                      Name
                    </th>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left">
                      Gender
                    </th>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left">
                      Age
                    </th>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left">
                      Email
                    </th>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentPatients.map((patient) => (
                    <tr
                      key={patient.patient_id}
                      className="bg-white hover:bg-blue-50 transition"
                    >
                      <td className="px-3 py-4">
                        <img
                          src={patient.profile_image || "/default-profile.png"}
                          alt="Patient"
                          className="w-10 h-10 rounded-full border border-blue-500"
                        />
                      </td>
                      <td className="px-3 py-4 font-medium text-gray-900">
                        {patient.firstname} {patient.lastname}
                      </td>
                      <td className="px-3 py-4 text-gray-600">
                        {patient.gender || "N/A"}
                      </td>
                      <td className="px-3 py-4 text-gray-600">
                        {patient.age || "N/A"}
                      </td>
                      <td className="px-3 py-4 text-gray-600">
                        {patient.email || "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2 items-center">
                          {/* View Button */}
                          <div className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 transition">
                            <Eye size={16} className="mr-1" />
                            <span className="text-sm">View</span>
                          </div>

                          {/* Approve Button */}
                          <div className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded cursor-pointer hover:bg-green-200 transition">
                            <Edit2 size={16} className="mr-1" />
                            <span className="text-sm">Update</span>
                          </div>

                          {/* Reject Button */}
                          <div className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded cursor-pointer hover:bg-red-200 transition">
                            <X size={16} className="mr-1" />
                            <span className="text-sm">Delete</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center mt-6 gap-2 md:gap-4">
              <div
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 bg-white cursor-pointer hover:scale-105 transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-200  c transform-none shadow-none"
                    : ""
                }`}
                onClick={handlePrevPage}
              >
                {/* Left arrow */}
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

              <div className="flex items-center">
                <span className="hidden md:flex items-center gap-1 text-sm md:text-base">
                  Page <span className="font-bold">{currentPage}</span> of{" "}
                  {totalPages}
                </span>
                <span className="flex md:hidden items-center gap-1 text-sm">
                  <div className="flex justify-center items-center h-8 w-8 rounded-full font-bold bg-blue-100 text-blue-600">
                    {currentPage}
                  </div>
                  / {totalPages}
                </span>
              </div>

              <div
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 bg-white cursor-pointer hover:scale-105 transition-all duration-300 ${
                  currentPage === totalPages
                    ? "bg-gray-200  transform-none shadow-none"
                    : ""
                }`}
                onClick={handleNextPage}
              >
                Next
                {/* Right arrow */}
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

export default SAllPatients;
