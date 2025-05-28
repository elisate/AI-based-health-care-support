import React, { useEffect, useState } from "react";
import { CalendarDays, Eye, Edit2, X } from "lucide-react";
import "../dashboardstyles/table.css";

const DoctorPatientAssigned = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
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
        const response = await fetch(
          `http://127.0.0.1:8000/recommend/doctor/patientTreated/${doctorId}`
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

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
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
                  {currentPatients.map((patient) => (
                    <tr
                      key={patient.id}
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
                        {patient.full_name}
                      </td>
                      <td className="px-3 py-4 text-gray-600">
                        {patient.gender || "N/A"}
                      </td>
                      <td className="px-3 py-4 text-gray-600">
                        {patient.age || "N/A"}
                      </td>
                      <td className="px-3 py-4 text-gray-600">
                        {patient.phone || "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2 items-center">
                          <div
                            className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 transition"
                            onClick={() => handleView(patient)}
                          >
                            <Eye size={16} className="mr-1" />
                            <span className="text-sm">View</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center  items-center mt-6 gap-2 md:gap-4">
              <span
                className={`px-4 py-2 rounded-lg cursor-pointer text-sm cursor-pointer shadow-md text-blue-500 bg-white hover:scale-105 transition-all duration-300 ${
                  currentPage === 1
                    
                }`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </span>

              <span className="text-sm md:text-base">
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>

              <span
                className={`px-4 py-2 rounded-lg text-sm cursor-pointer
                  shadow-md text-blue-500 bg-white hover:scale-105  transition-all duration-300 ${
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

      {/* Modal */}
      {isModalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative max-h-[95vh] overflow-y-auto">
            <X
              size={24}
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 cursor-pointer"
            />

            <h2 className="text-xl font-bold text-blue-600 mb-4">
              {selectedPatient.full_name}'s Treatment History
            </h2>

            {selectedPatient.treatments.length === 0 ? (
              <p className="text-gray-600">No treatment history available.</p>
            ) : (
              <ul className="space-y-4">
                {selectedPatient.treatments.map((record, index) => (
                  <li
                    key={index}
                    className="border border-gray-200 p-4 rounded-lg"
                  >
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(record.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Diagnosis:</strong> {record.diagnosis}
                    </p>
                    <p>
                      <strong>Prescription:</strong> {record.prescription}
                    </p>
                    <p>
                      <strong>Notes:</strong> {record.notes}
                    </p>
                    <p>
                      <strong>Symptoms:</strong>{" "}
                      {Array.isArray(record.symptoms)
                        ? record.symptoms.join(", ")
                        : record.symptoms}
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
