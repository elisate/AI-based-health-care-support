import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";
import { useParams } from "react-router-dom";

const PatientPro = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const chartData = [
    { name: "Jan", BloodPressure: 30, HeartRate: 35 },
    { name: "Feb", BloodPressure: 60, HeartRate: 30 },
    { name: "Mar", BloodPressure: 65, HeartRate: 40 },
    { name: "Apr", BloodPressure: 80, HeartRate: 65 },
    { name: "May", BloodPressure: 40, HeartRate: 50 },
    { name: "Jun", BloodPressure: 90, HeartRate: 70 },
    { name: "Jul", BloodPressure: 70, HeartRate: 50 },
  ];

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/recommend/loadPatientData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ national_id: patientId })
        });

        if (!response.ok) throw new Error("Failed to load patient data");

        const data = await response.json();
        if (data.patient) {
          setPatient(data.patient);
          setError("");
        } else {
          setError("No patient found with that ID");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPatient();
  }, [patientId]);

  const totalPages = patient?.treatments ? Math.ceil(patient.treatments.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTreatments = patient?.treatments?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="dashboard-container">
        {/* Patient Info */}
        {patient && (
          <div className="patient-info-card">
            <div className="profile-body">
              <h2>{patient.firstname} {patient.lastname}</h2>
              {/* <p className="expertise"><strong>Disease:</strong> Not Provided</p>
              <p><strong>Email:</strong> <a href={`mailto:${patient.email}`}>{patient.email || "Not Provided"}</a></p> */}
              <p><strong>National ID:</strong> {patient.national_id}</p>
            </div>

            <div className="doctor-statss">
              <div className="stat"><p>{patient.height_cm} cm</p><small>Height</small></div>
              <div className="stat"><p>{patient.gender}</p><small>Gender</small></div>
              <div className="stat"><p>{patient.age} yrs</p><small>Age</small></div>
              <div className="stat"><p>{patient.weight_kg} kg</p><small>Weight</small></div>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="chart-section">
          <h3>Blood Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="BloodPressure" fill="#2979ff" />
              <Bar dataKey="HeartRate" fill="#2978ff93" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Personal Info */}
        <div className="specialiity">
          <h3>Personal Information</h3>
          {patient && (
            <ul className="info">
              <li><strong>Names:</strong> {patient.firstname} {patient.lastname}</li>
              <li><strong>Gender:</strong> {patient.gender}</li>
              <li><strong>Age:</strong> {patient.age}</li>
              <li><strong>Phone:</strong> {patient.phone}</li>
              {/* <li><strong>Email:</strong> {patient.email || "Not Provided"}</li> */}
              <li><strong>National ID:</strong> {patient.national_id}</li>
            </ul>
          )}
        </div>

        {/* Message */}
        <div className="specialiity">
          <h3>Messages</h3>
          {patient && (
            <div className="message-list">
              <li style={{ marginTop: "2rem" }}>
                <strong>Dr. Caleb Hamissi: </strong>No description provided.
              </li>
            </div>
          )}
        </div>

        {/* Treatment History */}
        {currentTreatments.length > 0 && (
          <div className="specialiity">
            <h3>Treatment History</h3>
            <ul className="info">
              {currentTreatments.map((treatment) => (
                <li key={treatment.treatment_id} style={{ marginBottom: "1rem" }}>
                  <p><strong>Date:</strong> {new Date(treatment.created_at).toLocaleDateString()}</p>
                  <p><strong>Doctor:</strong> {treatment.doctor.name}</p>
                  <p><strong>Symptoms:</strong> {treatment.symptoms.join(", ")}</p>
                  <p><strong>Diagnosis:</strong> {treatment.diagnosis}</p>
                  <p><strong>Prescription:</strong> {treatment.prescription}</p>
                  <p><strong>Notes:</strong> {treatment.notes || "N/A"}</p>
                </li>
              ))}
            </ul>

            {/* Pagination Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem",}}>
              <span className="text-sm cursor-pointer" onClick={handlePrev} disabled={currentPage === 1}>
                Previous
              </span>
              <span className="text-sm cursor-pointer">Page {currentPage} of {totalPages}</span>
              <span className="text-sm cursor-pointer" onClick={handleNext} disabled={currentPage === totalPages}>
                Next
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPro;
