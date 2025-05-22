
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CalendarCheck } from 'lucide-react'
function SingleAppointment() {
  const { appointment_id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.response?.data?.message || err.message || 'Error fetching appointment');
      } finally {
        setLoading(false);
      }
    };

    if (appointment_id) {
      fetchAppointment();
    }
  }, [appointment_id]);

  const handleAssignAppointment = () => {
    console.log('Assigning appointment:', appointment_id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-blue-500 text-lg">Loading appointment...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-black text-lg">Appointment not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-row text-blue-500 md:flex-row items-start md:items-center mb-8 gap-4">
          <CalendarCheck/><h1 className="text-3xl font-bold "> Appointment Details</h1>
          
        </div>

        {/* Appointment Info Card */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-8">
          {/* Section 1: Basic & Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold border-b pb-1">Appointment Info</h2>
              <p><span className="font-medium text-gray-700">Appointment ID:</span> {appointment.id}</p>
              <p><span className="font-medium text-gray-700">Date:</span> {appointment.date}</p>
              <p><span className="font-medium text-gray-700">Day:</span> {appointment.day}</p>
              <p><span className="font-medium text-gray-700">Start:</span> {appointment.start_time}</p>
              <p><span className="font-medium text-gray-700">End:</span> {appointment.end_time}</p>
              <p><span className="font-medium text-gray-700">Status:</span> <span className={`px-2 py-1 rounded text-sm ${
                appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>{appointment.status}</span></p>
              <p><span className="font-medium text-gray-700">Created:</span> {new Date(appointment.created_at).toLocaleString()}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold border-b pb-1">Patient Info</h2>
              <p><span className="font-medium text-gray-700">Name:</span> {appointment.user.firstname} {appointment.user.lastname}</p>
              <p><span className="font-medium text-gray-700">Email:</span> {appointment.user.email}</p>
              <p><span className="font-medium text-gray-700">Phone:</span> {appointment.user.phone || 'N/A'}</p>
              <p><span className="font-medium text-gray-700">User Role:</span> {appointment.user.userRole}</p>
              <p><span className="font-medium text-gray-700">Hospital Name:</span> {appointment.user.hospitalName || 'N/A'}</p>
            </div>
          </div>

          {/* Section 2: Hospital & Other */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold border-b pb-1">Hospital Info</h2>
              <p><span className="font-medium text-gray-700">Hospital:</span> {appointment.hospital}</p>
              <p><span className="font-medium text-gray-700">Prediction ID:</span> {appointment.prediction}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t flex flex-wrap gap-4">
            <button
              onClick={handleAssignAppointment}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg font-light  hover:bg-blue-700 transition"
            >
              Assign Appointment
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-200 text-black px-3 py-2 rounded-lg font-light hover:bg-gray-300 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleAppointment;