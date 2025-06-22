import React, { useEffect, useState } from "react";
import { CalendarDays, Eye, X } from "lucide-react";
import "../dashboardstyles/table.css";
import axios from "axios";

const DoctorPatientAssigned = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const doctorId = userToken?.role_data?.user;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/recommend/doctor/patientTreated/${doctorId}`
        );

        const fetchedPatients = response.data.patients;

        if (Array.isArray(fetchedPatients)) {
          setPatients(fetchedPatients);
        } else {
          setPatients([]);
        }
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Pagination logic
  const totalPatients = patients.length;
  const totalPages = Math.ceil(totalPatients / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = patients.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const displayOrNA = (value) =>
    value === null || value === "" ? "N/A" : value;

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-16 rounded-xl shadow-lg bg-white text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarDays size={28} className="text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Patients Treated By Doctor
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
                      Full Name
                    </th>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left">
                      Gender
                    </th>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left">
                      Age
                    </th>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left">
                      Phone
                    </th>
                    <th className="px-3 py-4 bg-blue-500 text-white text-left rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentPatients.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-gray-500 font-medium"
                      >
                        No patients found.
                      </td>
                    </tr>
                  ) : (
                    currentPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="bg-white hover:bg-blue-50 transition"
                      >
                        <td className="px-3 py-4">
                          <img
                            src={patient.profile_image || "/default-profile.png"}
                            alt={patient.full_name || "Patient"}
                            className="w-10 h-10 rounded-full border border-blue-500 object-cover"
                          />
                        </td>
                        <td className="px-3 py-4 font-medium text-gray-900">
                          {displayOrNA(patient.full_name)}
                        </td>
                        <td className="px-3 py-4 text-gray-600">
                          {displayOrNA(patient.gender)}
                        </td>
                        <td className="px-3 py-4 text-gray-600">
                          {displayOrNA(patient.age)}
                        </td>
                        <td className="px-3 py-4 text-gray-600">
                          {displayOrNA(patient.phone)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            type="button"
                            className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition"
                            onClick={() => handleView(patient)}
                          >
                            <Eye size={16} className="mr-1" />
                            <span className="text-sm">View</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center mt-6 gap-2 md:gap-4">
              <button
                className="px-4 py-2 rounded-lg text-sm shadow-md text-blue-500 bg-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                Previous
              </button>

              <span className="text-sm md:text-base">
                Page <strong>{currentPage}</strong> of {totalPages || 1}
              </span>

              <button
                className="px-4 py-2 rounded-lg text-sm shadow-md text-blue-500 bg-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPatient && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative max-h-[95vh] overflow-y-auto">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2
              id="modal-title"
              className="text-xl font-bold text-blue-600 mb-4"
            >
              {displayOrNA(selectedPatient.full_name)}'s Treatment History
            </h2>

            {!selectedPatient.treatments ||
            selectedPatient.treatments.length === 0 ? (
              <p className="text-gray-600">No treatment history available.</p>
            ) : (
              <ul className="space-y-4">
                {selectedPatient.treatments.map((record, index) => (
                  <li
                    key={record.id || index}
                    className="border border-gray-200 p-4 rounded-lg"
                  >
                    <p>
                      <strong>Date:</strong>{" "}
                      {record.created_at
                        ? new Date(record.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Diagnosis:</strong>{" "}
                      {displayOrNA(record.diagnosis)}
                    </p>
                    <p>
                      <strong>Prescription:</strong>{" "}
                      {displayOrNA(record.prescription)}
                    </p>
                    <p>
                      <strong>Notes:</strong> {displayOrNA(record.notes)}
                    </p>
                    <p>
                      <strong>Symptoms:</strong>{" "}
                      {Array.isArray(record.symptoms)
                        ? record.symptoms.join(", ")
                        : displayOrNA(record.symptoms)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPatientAssigned;
