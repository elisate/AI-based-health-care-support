import React, { useEffect, useState } from "react";
import { CalendarDays, Edit2, X, Eye } from "lucide-react";
import ViewDoctor from "./viewDoctor";
import EditDoctorModal from "./EditDoctorModal";
import "../dashboardstyles/table.css";
import Notify from "../utils/notifyConfig";
import Confirm from "../utils/confirmCofig";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal states
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [openModal, setModal] = useState(false);
  const [openUpdateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const hospitalId = userToken?.role_data?.id;

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/recommend/doctor/getDoctorByHospitalId/${hospitalId}`
        );
        const data = await response.json();

        if (data.doctors && Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
          setTotalDoctors(data.doctors.length);
        } else {
          setDoctors([]);
          setTotalDoctors(0);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setDoctors([]);
        setTotalDoctors(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Delete handler
  const handleDeleteDoctor = (doctorId) => {
    Confirm.show(
      "Delete Confirmation",
      "Are you sure you want to delete this doctor?",
      "Yes, Delete",
      "No, Keep Doctor",
      async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/recommend/DeleteById/${doctorId}`,
            { method: "DELETE" }
          );
          const result = await response.json();

          if (response.ok) {
            setDoctors((prev) =>
              prev.filter((doc) => doc.doctor_id !== doctorId)
            );
            setTotalDoctors((prev) => prev - 1);
            Notify.success(result.message || "Doctor deleted successfully");
          } else {
            Notify.failure(result.error || "Failed to delete doctor");
          }
        } catch (error) {
          console.error("Error deleting doctor:", error);
          Notify.failure("An error occurred while deleting the doctor");
        }
      },
      () => {
        Notify.info("Doctor deletion was cancelled.");
      }
    );
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // View Modal handlers
  const handleOpenView = (doctor_id) => {
    setSelectedDoctorId(doctor_id);
    setModal(true);
  };

  const handleCloseView = () => {
    setSelectedDoctorId(null);
    setModal(false);
  };

  // Update Modal handlers
  const handleUpdate = (doctor_id) => {
    setSelectedDoctorId(doctor_id);
    setUpdateModal(true);
  };

  const handleCloseUpdate = () => {
    setUpdateModal(false);
    setSelectedDoctorId(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100">
      {openModal && (
        <ViewDoctor doctorId={selectedDoctorId} handleView={handleCloseView} />
      )}
      {openUpdateModal && (
        <EditDoctorModal
          doctorId={selectedDoctorId}
          handleCloseUpdate={handleCloseUpdate}
        />
      )}

      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-16 rounded-xl shadow-lg bg-white text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarDays size={28} className="text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Doctors List
            </h1>
          </div>
          <div className="text-base md:text-lg font-medium text-gray-500">
            Total: {totalDoctors}
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
                      Profile
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider bg-blue-500 text-white">
                      Name
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider hidden md:table-cell bg-blue-500 text-white">
                      Specialty
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
                  {currentDoctors.map((doc) => (
                    <tr
                      key={doc.doctor_id}
                      className={`transition-colors ${
                        doc.doctor_id.charCodeAt(0) % 2 === 0
                          ? "bg-blue-50 hover:bg-blue-100"
                          : "bg-white hover:bg-blue-50"
                      }`}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <img
                          src={doc.profile_image_url}
                          alt="Doctor Profile"
                          className="w-10 h-10 rounded-full border-1 border-blue-500"
                        />
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap font-medium text-gray-900">
                        {doc.firstname} {doc.lastname}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell text-gray-600">
                        {doc.specialty || "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-gray-600">
                        {doc.email || "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2 items-center">
                          <div
                            className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 transition"
                            onClick={() => handleOpenView(doc.doctor_id)}
                          >
                            <Eye size={16} className="mr-1" />
                            <span className="text-sm">View</span>
                          </div>
                          <div
                            className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded cursor-pointer hover:bg-green-200 transition"
                            onClick={() => handleUpdate(doc.doctor_id)}
                          >
                            <Edit2 size={16} className="mr-1" />
                            <span className="text-sm">Update</span>
                          </div>
                          <div
                            className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded cursor-pointer hover:bg-red-200 transition"
                            onClick={() => handleDeleteDoctor(doc.doctor_id)}
                          >
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
                    ? "bg-gray-200 transform-none shadow-none"
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
                    ? "bg-gray-200 transform-none shadow-none"
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

export default AllDoctors;
