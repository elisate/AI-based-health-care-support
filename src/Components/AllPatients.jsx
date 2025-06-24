import React, { useEffect, useState } from "react";
import { CalendarDays, Edit2, X, Eye, Trash2 } from "lucide-react";
import { Notify, Confirm } from "notiflix";
import "../dashboardstyles/table.css";

// Modal to View Patient Details with dynamic fetch
const ViewPatientModal = ({ patientId, onClose }) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;

    const fetchPatient = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/recommend/patient/getById/${patientId}`
        );
        if (res.ok) {
          const data = await res.json();
          setPatient(data);
        } else {
          Notify.failure("Failed to load patient details");
          onClose();
        }
      } catch (error) {
        Notify.failure("Network error while fetching patient details");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId, onClose]);

  if (!patientId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative min-h-[300px]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full"
          aria-label="Close view modal"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          Patient Details
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          patient && (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {patient.firstname} {patient.lastname}
              </p>
              <p>
                <strong>Age:</strong> {patient.age || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {patient.gender || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {patient.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {patient.phone || "N/A"}
              </p>
              <p>
                <strong>National ID:</strong> {patient.national_id || "N/A"}
              </p>
              <p>
                <strong>Notes:</strong> {patient.notes || "N/A"}
              </p>
              {/* Add other fields if you want */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

// Modal to Edit Patient Info
const EditPatientModal = ({ patient, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstname: patient?.firstname || "",
    lastname: patient?.lastname || "",
    age: patient?.age || "",
    gender: patient?.gender || "",
    phone: patient?.phone || "",
    email: patient?.email || "",
    national_id: patient?.national_id || "",
    notes: patient?.notes || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommend/patient/UpdateById/${patient.patient_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        Notify.success("Patient updated successfully");
        onSave();
        onClose();
      } else {
        const err = await response.json();
        Notify.failure(err.error || "Failed to update patient");
      }
    } catch {
      Notify.failure("Network error");
    }
    setSaving(false);
  };

  if (!patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full"
          aria-label="Close edit modal"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold text-blue-700">Edit Patient</h2>

        <input
          type="text"
          placeholder="First Name"
          value={formData.firstname}
          onChange={(e) => handleChange("firstname", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={(e) => handleChange("lastname", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => handleChange("age", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <select
          value={formData.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="National ID"
          value={formData.national_id}
          onChange={(e) => handleChange("national_id", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Store only patient_id when viewing to fetch full details
  const [viewingPatientId, setViewingPatientId] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const hospitalId = userToken?.role_data?.id;

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

  const handleDelete = (patientId) => {
    Confirm.show(
      "Confirm Delete",
      "Are you sure you want to delete this patient?",
      "Yes",
      "No",
      async () => {
        try {
          const res = await fetch(
            `http://127.0.0.1:8000/recommend/patient/deleteById/${patientId}`,
            { method: "DELETE" }
          );
          if (res.ok) {
            Notify.success("Patient deleted successfully");
            fetchPatients();
          } else {
            const err = await res.json();
            Notify.failure(err.error || "Delete failed");
          }
        } catch {
          Notify.failure("Network error");
        }
      }
    );
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
                          <div
                            className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 transition"
                            onClick={() =>
                              setViewingPatientId(patient.patient_id)
                            }
                          >
                            <Eye size={16} className="mr-1" />
                            <span className="text-sm">View</span>
                          </div>
                          <div
                            className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded cursor-pointer hover:bg-green-200 transition"
                            onClick={() => setEditingPatient(patient)}
                          >
                            <Edit2 size={16} className="mr-1" />
                            <span className="text-sm">Update</span>
                          </div>
                          <div
                            className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded cursor-pointer hover:bg-red-200 transition"
                            onClick={() => handleDelete(patient.patient_id)}
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
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Prev
              </button>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {viewingPatientId && (
        <ViewPatientModal
          patientId={viewingPatientId}
          onClose={() => setViewingPatientId(null)}
        />
      )}
      {editingPatient && (
        <EditPatientModal
          patient={editingPatient}
          onClose={() => setEditingPatient(null)}
          onSave={fetchPatients}
        />
      )}
    </div>
  );
};

export default AllPatients;
