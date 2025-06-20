import {
  Calendar,
  User,
  Stethoscope,
  Pill,
  FileText,
  AlertCircle,
  Plus,
  X,
  Save,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Notify from "../utils/notifyConfig";
import Confirm from "../utils/confirmCofig";

const availableSymptoms = [
  "Fever",
  "Cough",
  "Headache",
  "Blurred vision",
  "Chest pain",
  "Shortness of breath",
  "Joint pain",
  "Swelling",
  "Stomach pain",
  "Nausea",
  "High blood pressure",
  "Weight loss",
  "Fatigue",
  "Itchy skin",
  "Redness",
  "Sore throat",
  "Difficulty swallowing",
  "Frequent urination",
  "Thirst",
  "Abdominal pain",
  "Bloating",
  "Dizziness",
  "Fainting",
  "Back pain",
  "Leg numbness",
];

export default function Treatment() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      appointment_id: appointmentId || "",
      symptoms: [],
      diagnosis: "",
      prescription: "",
      notes: "",
    },
  });

  const symptoms = watch("symptoms");
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const addSymptom = () => {
    if (currentSymptom.trim() && !symptoms.includes(currentSymptom.trim())) {
      const updatedSymptoms = [...symptoms, currentSymptom.trim()];
      setValue("symptoms", updatedSymptoms);
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (symptomToRemove) => {
    const updatedSymptoms = symptoms.filter((s) => s !== symptomToRemove);
    setValue("symptoms", updatedSymptoms);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/recommend/doctor/treating",
        data
      );
      setIsSubmitted(true);
      Notify.success("Treatment Saved");
    } catch (error) {
      Notify.failure(error.message || "Failed to save treatment");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    reset({
      appointment_id: "",
      symptoms: [],
      diagnosis: "",
      prescription: "",
      notes: "",
    });
    setIsSubmitted(false);
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    Confirm.show(
      `${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)} Confirmation`,
      `Are you sure you want to ${newStatus} this appointment?`,
      "Yes",
      "Cancel",
      async () => {
        try {
          const userToken = JSON.parse(localStorage.getItem("userToken"));
          const token = userToken?.token;

          const response = await fetch(
            `http://127.0.0.1:8000/recommend/appointment/update-status/${appointmentId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
              body: JSON.stringify({ status: newStatus }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update status");
          }

          setAppointments((prev) =>
            prev.map((apt) =>
              apt.appointment_id === appointmentId
                ? { ...apt, status: newStatus }
                : apt
            )
          );
          Notify.success(`Appointment status updated to ${newStatus}`);
          navigate("/doctor/Appointment");
        } catch (error) {
          Notify.failure("Failed to update appointment status");
        }
      },
      () => {
        Notify.info("Status update cancelled");
      }
    );
  };

  return (
    <div className="min-h-screen bg-white ml-[5rem]">
      <div className="bg-blue-500 text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            {isSubmitted
              ? "Medical Appointment Details"
              : "New Medical Appointment"}
          </h1>
          <p className="text-blue-100">
            {isSubmitted ? "Patient Care Record" : "Enter Patient Information"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white border-2 border-blue-500 rounded-lg p-6 mb-6 shadow-md">
              <div className="flex items-center mb-4">
                <Calendar className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">
                  Appointment Information
                </h2>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-blue-600 font-medium">
                  Appointment ID *
                </label>
                <input
                  type="text"
                  {...register("appointment_id", { required: true })}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black"
                  placeholder="Enter appointment ID"
                />
              </div>
            </div>

            {/* Symptom Input */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <User className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">
                  Patient Symptoms *
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <select
                    value={currentSymptom}
                    onChange={(e) => setCurrentSymptom(e.target.value)}
                    className="flex-1 p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black"
                  >
                    <option value="">Select a symptom</option>
                    {availableSymptoms.map((symptom, index) => (
                      <option key={index} value={symptom}>
                        {symptom}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addSymptom}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {symptoms.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      Current Symptoms:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {symptoms.map((symptom, index) => (
                        <div
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          <span className="text-sm">{symptom}</span>
                          <X
                            size={16}
                            onClick={() => removeSymptom(symptom)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Diagnosis */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Stethoscope className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">Diagnosis *</h2>
              </div>
              <input
                type="text"
                {...register("diagnosis", { required: true })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black"
                placeholder="Enter diagnosis"
              />
            </div>

            {/* Prescription */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Pill className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">Prescription</h2>
              </div>
              <textarea
                {...register("prescription")}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black h-24 resize-none"
                placeholder="Enter prescription details (medication, dosage, duration)"
              />
            </div>

            {/* Notes */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <FileText className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">Medical Notes</h2>
              </div>
              <textarea
                {...register("notes")}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black h-24 resize-none"
                placeholder="Enter additional notes and instructions for patient"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-2 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md flex items-center gap-2"
                disabled={loading}
              >
                <Save size={20} />
                {loading ? "Saving..." : "Save Appointment"}
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* After submission */}
            <button
              className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-3 rounded-lg font-sm transition-colors duration-200 shadow-md"
              onClick={() => updateAppointmentStatus(appointmentId, "completed")}
            >
              Complete
            </button>
          </>
        )}
      </div>
    </div>
  );
}