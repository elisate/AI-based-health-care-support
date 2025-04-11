import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PatientSymptomForm() {
  const availableSymptoms = [
    "Fever", "Cough", "Headache", "Blurred vision", "Chest pain",
    "Shortness of breath", "Joint pain", "Swelling", "Stomach pain",
    "Nausea", "High blood pressure", "Weight loss", "Fatigue", "Itchy skin",
    "Redness", "Sore throat", "Difficulty swallowing", "Frequent urination",
    "Thirst", "Abdominal pain", "Bloating", "Dizziness", "Fainting",
    "Back pain", "Leg numbness",
  ];

  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);

  const { register, handleSubmit, setValue } = useForm();

  const handleSymptomChange = (e) => {
    setSelectedSymptom(e.target.value);
  };

  const addSymptom = () => {
    if (selectedSymptom && !symptoms.includes(selectedSymptom)) {
      const updatedSymptoms = [...symptoms, selectedSymptom];
      setSymptoms(updatedSymptoms);
      setValue("symptoms", updatedSymptoms); // update form value
      setSelectedSymptom(""); // Reset selection
    }
  };

  const removeSymptom = (symptomToRemove) => {
    const updatedSymptoms = symptoms.filter(s => s !== symptomToRemove);
    setSymptoms(updatedSymptoms);
    setValue("symptoms", updatedSymptoms); // update form value
  };

  const loadSampleData = () => {
    setValue("user_id", "12345");
    setValue("location", "New York");
    const sampleSymptoms = ["Fever", "Cough"];
    setSymptoms(sampleSymptoms);
    setValue("symptoms", sampleSymptoms);
  };

  const onsubmit = async (data) => {
    try {
      const { user_id, location, symptoms } = data;
      const formData = {
        user_id,
        location,
        symptoms,
      };

      const res = await axios.post(
        "http://localhost:8000/recommend/resourceFinder",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Submitted:", res.data);
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Patient Symptom Form
        </h2>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto w-full sm:max-w-md lg:max-w-lg">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow sm:rounded-lg">
          <form className="space-y-5" onSubmit={handleSubmit(onsubmit)}>
            {/* Patient ID */}
            <div>
              <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                Patient ID
              </label>
              <div className="mt-1">
                <input
                  id="user_id"
                  {...register("user_id")}
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Symptoms
              </label>
              <div className="mt-1 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <select
                  value={selectedSymptom}
                  onChange={handleSymptomChange}
                  className="flex-grow appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a symptom</option>
                  {availableSymptoms
                    .filter(symptom => !symptoms.includes(symptom))
                    .map((symptom, index) => (
                      <option key={index} value={symptom}>
                        {symptom}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={addSymptom}
                  disabled={!selectedSymptom}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>

              {/* Show selected symptoms */}
              {symptoms.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-2">Selected symptoms:</p>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
                      >
                        {symptom}
                        <button
                          type="button"
                          onClick={() => removeSymptom(symptom)}
                          className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                          aria-label={`Remove ${symptom}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <input type="hidden" {...register("symptoms")} value={JSON.stringify(symptoms)} />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1">
                <input
                  id="location"
                  {...register("location")}
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
              <button
                type="submit"
                className="flex-grow flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={loadSampleData}
                className="flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Load Sample
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
