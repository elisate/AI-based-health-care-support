import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PatientIndexPage = () => {
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

  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const patientId = userToken?.role_data?.id;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/recommend/patientGetDataByHisId/${patientId}`
        );
        if (!response.ok) throw new Error("Failed to load patient data");

        const data = await response.json();
        if (data) {
          setPatient(data);
          setError("");
        } else {
          setError("No patient found with that ID");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  const totalPages = patient?.treatments
    ? Math.ceil(patient.treatments.length / itemsPerPage)
    : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTreatments =
    patient?.treatments?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="dashboard-container">
        {/* Patient Info */}
        {patient && (
          <div className="patient-info-card">
            <div className="profile-body">
              <h2>{patient.full_name || "Name Not Provided"}</h2>
              <p className="expertise">
                <strong>Disease:</strong>{" "}
                {patient.ongoing_treatments?.[0] || "Not Provided"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {patient.phone || "Not Provided"}
              </p>
              <p>
                <strong>National ID:</strong> {patient.national_id}
              </p>
            </div>

            <div className="doctor-statss">
              <div className="stat">
                <p>{patient.height_cm || "--"} cm</p>
                <small>Height</small>
              </div>
              <div className="stat">
                <p>{patient.gender || "--"}</p>
                <small>Gender</small>
              </div>
              <div className="stat">
                <p>{patient.age || "--"} yrs</p>
                <small>Age</small>
              </div>
              <div className="stat">
                <p>{patient.weight_kg || "--"} kg</p>
                <small>Weight</small>
              </div>
            </div>
          </div>
        )}

        {/* Chart Section */}
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

        {/* Personal Info Section */}
        <div className="specialiity">
          <h3>Personal Information</h3>
          {patient && (
            <ul className="info">
              <li>
                <strong>Full Name:</strong> {patient.full_name}
              </li>
              <li>
                <strong>Gender:</strong> {patient.gender || "Not Provided"}
              </li>
              <li>
                <strong>Age:</strong> {patient.age || "Not Provided"}
              </li>
              <li>
                <strong>Phone:</strong> {patient.phone || "Not Provided"}
              </li>
              <li>
                <strong>National ID:</strong> {patient.national_id}
              </li>
            </ul>
          )}
        </div>

        {/* Messages */}
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
                <li key={treatment.id} style={{ marginBottom: "1rem" }}>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(treatment.created_at).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Symptoms:</strong>{" "}
                    {treatment.symptoms?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <strong>Diagnosis:</strong> {treatment.diagnosis}
                  </p>
                  <p>
                    <strong>Prescription:</strong> {treatment.prescription}
                  </p>
                  <p>
                    <strong>Notes:</strong> {treatment.notes || "N/A"}
                  </p>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <span
                className="text-sm cursor-pointer"
                onClick={handlePrev}
                style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                Previous
              </span>
              <span className="text-sm cursor-pointer">
                Page {currentPage} of {totalPages}
              </span>
              <span
                className="text-sm cursor-pointer"
                onClick={handleNext}
                style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
              >
                Next
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientIndexPage;
