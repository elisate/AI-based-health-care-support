// Same imports as before
import React, { useEffect, useState } from "react";
import { CalendarDays, X, Edit2, Eye } from "lucide-react";
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
            headers: { "Content-Type": "application/json" },
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
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-16 rounded-xl shadow-md bg-white text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarDays size={28} className="text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Registered Patients
            </h1>
          </div>
          <div className="text-base md:text-lg font-medium text-gray-600">
            Total: {patients.length}
          </div>
        </div>

        {patients.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No patients found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-blue-400">
              <table className="min-w-[700px] w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white text-sm">
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Age</th>
                    <th className="px-4 py-3 text-left">Gender</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedPatients.map((patient, idx) => (
                    <tr
                      key={patient.patient_id || idx}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              patient.profile_image ||
                              "https://via.placeholder.com/40"
                            }
                            alt="profile"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <span className="font-medium">
                            {truncateText(
                              `${patient.firstname} ${patient.lastname}`
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-700">
                        {truncateText(patient.email)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {truncateText(patient.phone || "N/A")}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {patient.age || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm capitalize text-gray-700">
                        {patient.gender || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 text-xs">
                            <Eye size={14} />
                            View
                          </button>
                          <button className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 text-xs">
                            <Edit2 size={14} />
                            Update
                          </button>
                          <button className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 text-xs">
                            <X size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap justify-center items-center mt-6 gap-4">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium shadow-md transition "bg-white text-blue-600 cursor-pointer
                  currentPage === 1
                      }`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </span>

              <span className="text-sm font-medium">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>

              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium shadow-md transition "bg-white text-blue-600 cursor-pointer
              
                  currentPage === totalPages
                   
                 
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneralPatients;
