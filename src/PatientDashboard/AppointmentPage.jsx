import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AppointmentPage() {
  const { id } = useParams(); // expects URL like /patient/findAppointment/:prediction_id
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/recommend/liveResultPredicted/predictions/${id}/`
        );
        const data = response.data; // ✅ Axios handles JSON for you
        setPrediction(data);
      } catch (error) {
        console.error("Error fetching prediction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!prediction) return <p>No prediction data found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prediction Details</h1>
      <p><strong>Diagnosis:</strong> {prediction.diagnosis}</p>
      <p><strong>Location:</strong> {prediction.location}</p>
      <p><strong>Symptoms:</strong> {prediction.symptoms?.join(", ")}</p>
      <p><strong>Recommended Doctors:</strong> {prediction.recommended_doctors?.join(", ")}</p>
      <p><strong>Recommended Hospitals:</strong> {prediction.recommended_hospitals?.join(", ")}</p>
      <p><strong>Medical Resources:</strong> {prediction.medical_resources?.join(", ")}</p>
      <p><strong>Medical Supplies:</strong> {prediction.medical_supplies?.join(", ")}</p>
      <p><strong>Prediction ID:</strong> {prediction.prediction_id}</p>
      <p><strong>Created At:</strong> {new Date(prediction.created_at).toLocaleString()}</p>
    </div>
  );
}

export default AppointmentPage;
