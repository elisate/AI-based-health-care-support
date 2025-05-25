import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CalendarCheck } from "lucide-react";

function SingleAssignedAppointment() {
  const { appointment_id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://127.0.0.1:8000/recommend/Appointment/getAppointmentById/${appointment_id}`
        );
        setAppointment(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error fetching appointment"
        );
      } finally {
        setLoading(false);
      }
    };

    if (appointment_id) {
      fetchAppointment();
    }
  }, [appointment_id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-500">
        Loading appointment...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  if (!appointment)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Appointment not found
      </div>
    );

  const handleTreatment = (appointmentId) => {
    navigate(`/doctor/TreatPatient/${appointmentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-row text-blue-500 items-start md:items-center mb-8 gap-4">
          <CalendarCheck />
          <h1 className="text-3xl font-bold text-black">Appointment Details</h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2  ">
              <h2 className="text-lg font-semibold border-b pb-1">
                Appointment Info
              </h2>
              <p>
                <strong className="text-gray-800">ID:</strong> {appointment.id}
              </p>
              <p>
                <strong className="text-gray-800">Date:</strong>{" "}
                {appointment.date}
              </p>
              <p>
                <strong className="text-gray-800">Day:</strong>{" "}
                {appointment.day}
              </p>
              <p>
                <strong className="text-gray-800">Start:</strong>{" "}
                {appointment.start_time}
              </p>
              <p>
                <strong className="text-gray-800">End:</strong>{" "}
                {appointment.end_time}
              </p>
              <p>
                <>Status:</>{" "}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    appointment.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(appointment.created_at).toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold border-b pb-1">
                Patient Info
              </h2>
              <p>
                <strong className="text-gray-800">Name:</strong>{" "}
                {appointment.user.firstname} {appointment.user.lastname}
              </p>
              <p>
                <strong className="text-gray-800">Email:</strong>{" "}
                {appointment.user.email}
              </p>
              <p>
                <strong className="text-gray-800">Phone:</strong>{" "}
                {appointment.user.phone || "N/A"}
              </p>
              <p>
                <strong className="text-gray-800">Role:</strong>{" "}
                {appointment.user.userRole}
              </p>
              <p>
                <strong className="text-gray-800">Hospital:</strong>{" "}
                {appointment.user.hospitalName || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold border-b pb-1">
                Hospital Info
              </h2>
              <p>
                <strong>Hospital:</strong> {appointment.hospital}
              </p>
              <p>
                <strong>Prediction ID:</strong> {appointment.prediction}
              </p>
            </div>
          </div>

          <div className="pt-4 ml-[-3.4rem] border-t flex flex-wrap gap-4">
            <button
              onClick={() => handleTreatment(appointment.id)}
              className="bg-blue-600 text-white px-1 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Consult
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-200 text-black px-1 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleAssignedAppointment;
