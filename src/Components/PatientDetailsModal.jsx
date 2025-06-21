import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Stethoscope,
  Pill,
  User,
  FileText,
  Phone,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

const PatientDetailsPage = () => {
  const { nationalId } = useParams(); // /patients/:id
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/recommend/GetLoaded/${nationalId}`);
        setPatient(res.data.patient);
      } catch (err) {
        console.error(err);
        setError("Failed to load patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [nationalId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-blue-600">
        <LoaderCircle className="w-8 h-8 animate-spin" />
        <span className="ml-3">Loading patient data...</span>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
        <AlertCircle className="w-8 h-8" />
        <p className="mt-2">{error || "Patient not found."}</p>
      </div>
    );
  }

  const {
    firstname,
    lastname,
    national_id,
    age,
    gender,
    phone,
    height_cm,
    weight_kg,
    profile_image,
    treatments,
  } = patient;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={profile_image || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              {firstname} {lastname}
            </h1>
            <p className="text-sm text-gray-600">National ID: {national_id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <User size={18} /> <span>Gender: {gender || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} /> <span>Age: {age || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} /> <span>Phone: {phone || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={18} /> <span>Height: {height_cm || "N/A"} cm</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={18} /> <span>Weight: {weight_kg || "N/A"} kg</span>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-blue-600 mb-4">
            Treatment History
          </h2>
          {treatments?.length > 0 ? (
            treatments.map((treatment) => (
              <div
                key={treatment.treatment_id}
                className="p-4 bg-gray-50 border rounded-lg mb-4"
              >
                <p className="text-sm">
                  <strong>Doctor:</strong>{" "}
                  {treatment.doctor?.name || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Diagnosis:</strong> {treatment.diagnosis}
                </p>
                <p className="text-sm">
                  <strong>Symptoms:</strong>{" "}
                  {treatment.symptoms?.join(", ") || "None"}
                </p>
                <p className="text-sm text-green-700">
                  <strong>Prescription:</strong> {treatment.prescription}
                </p>
                <p className="text-sm">
                  <strong>Notes:</strong> {treatment.notes}
                </p>
                <p className="text-xs text-gray-500">
                  Date:{" "}
                  {new Date(treatment.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">
              No treatment records available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;
