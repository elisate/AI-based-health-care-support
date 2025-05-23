import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AssignDoctor() {
  const { appointment_id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [assigningDoctorId, setAssigningDoctorId] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const hospitalId = userToken?.user?.hospital_id;

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/recommend/doctor/getDoctorByHospitalId/${hospitalId}`
        );
        setDoctors(res.data.doctors); // ✅ ensure correct structure
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAssign = async (doctor) => {
    try {
      setAssigningDoctorId(doctor.doctor_id);

      const payload = {
        appointment_id,
        doctor_name: `${doctor.firstname} ${doctor.lastname}`,
        Email: doctor.email,
      };

      await axios.post(
        "http://127.0.0.1:8000/recommend/appointment/assignToDoctor-status",
        payload
      );

      setStatus(
        `✅ Appointment assigned to Dr. ${doctor.firstname} ${doctor.lastname} successfully!`
      );
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to assign appointment.");
    } finally {
      setAssigningDoctorId(null);
    }
  };

  if (loading)
    return <div className="p-6 text-blue-500">Loading doctors...</div>;

  return (
    <div className="bg-white mt-10 p-6 rounded shadow max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Assign a Doctor for Appointment #{appointment_id}
      </h2>

      {status && (
        <div className="mb-4 text-sm font-medium text-green-700 bg-green-100 px-4 py-2 rounded">
          {status}
        </div>
      )}

      {doctors.length === 0 ? (
        <p className="text-gray-500">No doctors found for this hospital.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.doctor_id}
              className="flex flex-col justify-between border rounded-lg p-4 shadow hover:shadow-lg transition "
            >
              <div> 
                <img
                  src={doctor.profile_image_url}
                  alt="Doctor"
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Dr. {doctor.firstname} {doctor.lastname}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Gender:</strong> {doctor.gender}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Specialty:</strong> {doctor.specialty || "N/A"}
                </p>
              </div>
               
                <button
                  onClick={() => handleAssign(doctor)}
                  className="mt-auto bg-blue-600 text-white text-sm  py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                  disabled={assigningDoctorId === doctor.doctor_id}
                >
                  {assigningDoctorId === doctor.doctor_id
                    ? "Assigning..."
                    : "Assign Appointment"}
                </button>
              
               
          
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssignDoctor;
