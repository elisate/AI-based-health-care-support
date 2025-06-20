import React, { useEffect, useState } from "react";
import { CalendarDays ,X,Edit2,Eye} from "lucide-react";
import "../dashboardstyles/table.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";

const GeneralPatients = () => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getAllPatients = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/recommend/getAllPatients",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setPatients(res.data.patients || []);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        Notify.failure("Failed to load patients");
      }
    };

    getAllPatients();
  }, []);

  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const paginatedPatients = patients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const truncateText = (text, maxLength = 25) => {
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
              Registered Patients
            </h1>
          </div>

          <div className="text-base md:text-lg font-medium text-gray-500">
            Total: {patients.length}
          </div>
        </div>

        {patients.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No patients found.</div>
        ) : (
          <>
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400">
              <table className="min-w-[600px] w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tl-lg bg-blue-500 text-white">
                      Name
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider hidden md:table-cell bg-blue-500 text-white">
                      Email
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider bg-blue-500 text-white">
                      Phone
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider bg-blue-500 text-white">
                      Age
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tr-lg bg-blue-500 text-white">
                      Gender
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tr-lg bg-blue-500 text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedPatients.map((patient, idx) => (
                    <tr
                      key={patient.patient_id || idx}
                      className={`transition-colors ${
                        idx % 2 === 0
                          ? "bg-blue-50 hover:bg-blue-100"
                          : "bg-white hover:bg-blue-50"
                      }`}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              patient.profile_image ||
                              "https://via.placeholder.com/40"
                            }
                            alt="profile"
                            className="h-10 w-10 rounded-full object-cover bg-blue-100 text-blue-600"
                          />
                          <div className="font-medium text-gray-900">
                            {truncateText(`${patient.firstname || ""} ${patient.lastname || ""}`, 25)}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-600">
                          {truncateText(patient.email)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                        {truncateText(patient.phone || "N/A")}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                        {patient.age || "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap capitalize text-sm text-gray-700">
                        {patient.gender || "N/A"}
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

            <div className="flex flex-wrap justify-center items-center mt-6 gap-2 md:gap-4">
              <button
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 bg-white cursor-pointer hover:scale-105 transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : ""
                }`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="flex items-center gap-1 text-sm md:text-base">
                Page <span className="font-bold">{currentPage}</span> of {totalPages}
              </div>

              <button
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 bg-white cursor-pointer hover:scale-105 transition-all duration-300 ${
                  currentPage === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneralPatients;
