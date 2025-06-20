import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import "../dashboardstyles/table.css";
import { Edit2, X, Eye } from "lucide-react";
import axios from "axios";

const SAllHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/recommend/getAllHospitals"
        );
        const data = response.data.hospitals;

        if (Array.isArray(data)) {
          setHospitals(response.data.hospitals);
          setTotalHospitals(data.length);
        } else {
          setHospitals([]);
          setTotalHospitals(0);
        }
      } catch (error) {
        console.error("Failed to fetch hospitals:", error);
        setHospitals([]);
        setTotalHospitals(0);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHospitals = hospitals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(hospitals.length / itemsPerPage);

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
              Hospitals List
            </h1>
          </div>
          <div className="text-base md:text-lg font-medium text-gray-500">
            Total: {totalHospitals}
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
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tl-lg bg-blue-500 text-white">
                      Logo
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider bg-blue-500 text-white">
                      Name
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider hidden md:table-cell bg-blue-500 text-white">
                      Location
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider hidden lg:table-cell bg-blue-500 text-white">
                      Contact
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider bg-blue-500 text-white">
                      Email
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tr-lg bg-blue-500 text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentHospitals.map((hospital, index) => (
                    <tr
                      key={hospital._id || index}
                      className={`transition-colors ${
                        index % 2 === 0
                          ? "bg-blue-50 hover:bg-blue-100"
                          : "bg-white hover:bg-blue-50"
                      }`}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className="text-white text-sm bg-blue-500 px-3 py-1 rounded-full">
                          {hospital.hospital_name?.charAt(0).toUpperCase()}
                        </span>
                      </td>

                      <td className="px-3 py-4 whitespace-nowrap font-medium text-gray-900">
                        {hospital.hospital_name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell text-gray-600">
                        {hospital.location || "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap hidden lg:table-cell text-gray-600">
                        {hospital.contact || "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-gray-600">
                        {hospital.email || "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2 items-center">
                          <div className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 transition">
                            <Eye size={16} className="mr-1" />
                            <span className="text-sm">View</span>
                          </div>

                          <div className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded cursor-pointer hover:bg-green-200 transition">
                            <Edit2 size={16} className="mr-1" />
                            <span className="text-sm">Update</span>
                          </div>
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

            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-center items-center mt-6 gap-2 md:gap-4">
              <div
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 bg-white cursor-pointer hover:scale-105 transition-all duration-300 ${
                  currentPage === 1 ? "bg-gray-200 shadow-none" : ""
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
                  currentPage === totalPages ? "bg-gray-200 shadow-none" : ""
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

export default SAllHospitals;
