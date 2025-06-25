import React, { useEffect, useState } from "react";
import {
  MapPin,
  User,
  Activity,
  Stethoscope,
  Hospital,
  BookOpenCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const UserLastChats = () => {
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const userId = userToken?.user?.user_id;
  const [predictions, setPredictions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:8000/recommend/predictions/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.predictions?.length > 0) {
            setPredictions(data.predictions.reverse()); // Newest first
          }
        })
        .catch((err) => console.error("Error fetching predictions:", err));
    }
  }, [userId]);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < predictions.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  if (predictions.length === 0) {
    return (
      <div className="text-center mt-10 text-black font-semibold">
        No previous predictions found.
      </div>
    );
  }

  const prediction = predictions[currentIndex];

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-blue-500">
      <h2 className="text-2xl font-bold text-blue-500 mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6" /> Diagnosis #{currentIndex + 1}
      </h2>

      <div className="grid md:grid-cols-2 gap-8 text-black">
        {/* User Input */}
        <div className="space-y-4">
          <div className="text-xl font-semibold text-gray-500 ">
          <span className="mb-2 border-b border-black pb-1">User Input</span>  
          </div>

          <div className="flex items-start gap-2">
            <User className="text-blue-500" />
            <div>
              <strong>Symptoms:</strong> {prediction.symptoms.join(", ")}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="text-blue-500" />
            <div>
              <strong>Location:</strong> {prediction.location}
            </div>
          </div>
        </div>

        {/* Prediction Output */}
        <div className="space-y-4">
          <div className="text-xl font-semibold text-gray-500 ">
           <span className="mb-2 border-b border-black pb-1">Predicted Output</span> 
          </div>

          <div className="flex items-start gap-2">
            <Activity className="text-blue-500" />
            <div>
              <strong>Diagnosis:</strong> {prediction.diagnosis}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Stethoscope className="text-blue-500" />
            <div>
              <strong>Doctor(s):</strong>{" "}
              {prediction.recommended_doctors.join(", ")}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <BookOpenCheck className="text-blue-500" />
            <div>
              <strong>Supplies:</strong>{" "}
              {prediction.medical_supplies.join(", ")}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <BookOpenCheck className="text-blue-500" />
            <div>
              <strong>Resources:</strong>{" "}
              {prediction.medical_resources.join(", ")}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Hospital className="text-blue-500" />
            <div>
              <strong>Hospitals:</strong>{" "}
              {prediction.recommended_hospitals.join(", ")}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="text-blue-500" />
            <div>
              <strong>Date:</strong>{" "}
              {new Date(prediction.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${
            currentIndex === 0
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === predictions.length - 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${
            currentIndex === predictions.length - 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserLastChats;
