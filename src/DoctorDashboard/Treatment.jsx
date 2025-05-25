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
import { useState } from "react";

export default function Treatment() {
  const [appointmentData, setAppointmentData] = useState({
    appointment_id: "",
    symptoms: [],
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  const [currentSymptom, setCurrentSymptom] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addSymptom = () => {
    if (
      currentSymptom.trim() &&
      !appointmentData.symptoms.includes(currentSymptom.trim())
    ) {
      setAppointmentData((prev) => ({
        ...prev,
        symptoms: [...prev.symptoms, currentSymptom.trim()],
      }));
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setAppointmentData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.filter((symptom) => symptom !== symptomToRemove),
    }));
  };

  const handleInputChange = (field, value) => {
    setAppointmentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      appointmentData.appointment_id &&
      appointmentData.symptoms.length > 0 &&
      appointmentData.diagnosis
    ) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setAppointmentData({
      appointment_id: "",
      symptoms: [],
      diagnosis: "",
      prescription: "",
      notes: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white ml-[5rem]">
      {/* Header */}
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {!isSubmitted ? (
          /* Form Mode */
          <>
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
                  value={appointmentData.appointment_id}
                  onChange={(e) =>
                    handleInputChange("appointment_id", e.target.value)
                  }
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
                    onClick={addSymptom}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {appointmentData.symptoms.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      Current Symptoms:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {appointmentData.symptoms.map((symptom, index) => (
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
                value={appointmentData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
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
                value={appointmentData.prescription}
                onChange={(e) =>
                  handleInputChange("prescription", e.target.value)
                }
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
                value={appointmentData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-black h-24 resize-none"
                placeholder="Enter additional notes and instructions for patient"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={
                  !appointmentData.appointment_id ||
                  appointmentData.symptoms.length === 0 ||
                  !appointmentData.diagnosis
                }
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-2 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md flex items-center gap-2"
              >
                <Save size={20} />
                Save Appointment
              </button>
            </div>
          </>
        ) : (
          /* View Mode */
          <>
            {/* Appointment ID Card */}
            <div className="bg-white border-2 border-blue-500 rounded-lg p-6 mb-6 shadow-md">
              <div className="flex items-center mb-4">
                <Calendar className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">
                  Appointment Information
                </h2>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-600 font-medium">
                  Appointment ID
                </p>
                <p className="text-lg font-mono text-black">
                  {appointmentData.appointment_id}
                </p>
              </div>
            </div>

            {/* Symptoms Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <User className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">
                  Reported Symptoms
                </h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                <div className="flex flex-wrap gap-2">
                  {appointmentData.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagnosis Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Stethoscope className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-black">Diagnosis</h2>
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-md">
                <p className="text-xl font-bold">{appointmentData.diagnosis}</p>
              </div>
            </div>

            {/* Prescription Section */}
            {appointmentData.prescription && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <Pill className="text-blue-500 mr-3" size={24} />
                  <h2 className="text-xl font-semibold text-black">
                    Prescription
                  </h2>
                </div>
                <div className="bg-white border-2 border-blue-500 p-4 rounded-md">
                  <p className="text-black text-lg font-medium">
                    {appointmentData.prescription}
                  </p>
                </div>
              </div>
            )}

            {/* Notes Section */}
            {appointmentData.notes && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <FileText className="text-blue-500 mr-3" size={24} />
                  <h2 className="text-xl font-semibold text-black">
                    Medical Notes
                  </h2>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
                  <div className="flex items-start">
                    <AlertCircle
                      className="text-yellow-600 mr-2 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <p className="text-black">{appointmentData.notes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md">
                Print Record
              </button>
              <button className="bg-white hover:bg-gray-50 text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Share with Patient
              </button>
              <button
                onClick={resetForm}
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md"
              >
                New Appointment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
