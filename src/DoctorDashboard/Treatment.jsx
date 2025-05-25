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
import { useParams } from "react-router-dom";
import Notify from '../utils/notifyConfig'

export default function Treatment() {
  const { appointmentId } = useParams(); // Get appointment ID from URL
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

  const addSymptom = () => {
    if (
      currentSymptom.trim() &&
      !symptoms.includes(currentSymptom.trim())
    ) {
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
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/recommend/doctor/treating",
        data
      );
      console.log("Submitted:", response.data);
      setIsSubmitted(true);
      Notify.success("Treatment Saved")
    } catch (error) {
      console.error("Submission error:", error);
      Notify.failure(error)
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

  const appointmentData = watch();

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
            {/* Appointment ID Input */}
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

            {/* Symptoms Input */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <User className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">
                  Patient Symptoms *
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentSymptom}
                    onChange={(e) => setCurrentSymptom(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSymptom()}
                    className="flex-1 p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black"
                    placeholder="Enter a symptom (e.g., Fever, Headache)"
                  />
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

            {/* Diagnosis Input */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Stethoscope className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">
                  Diagnosis *
                </h2>
              </div>
              <input
                type="text"
                {...register("diagnosis", { required: true })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black"
                placeholder="Enter diagnosis"
              />
            </div>

            {/* Prescription Input */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Pill className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">
                  Prescription
                </h2>
              </div>
              <textarea
                {...register("prescription")}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black h-24 resize-none"
                placeholder="Enter prescription details (medication, dosage, duration)"
              />
            </div>

            {/* Notes Input */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <FileText className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">
                  Medical Notes
                </h2>
              </div>
              <textarea
                {...register("notes")}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black h-24 resize-none"
                placeholder="Enter additional notes and instructions for patient"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-2 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md flex items-center gap-2"
              >
                <Save size={20} />
                Save Appointment
              </button>
            </div>
          </form>
        ) : (
          // Your existing view mode (unchanged)
          <>
            {/* View-only display (kept unchanged) */}
            ...
            <button
              onClick={resetForm}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md"
            >
              New Appointment
            </button>
          </>
        )}
      </div>
    </div>
  );
}
