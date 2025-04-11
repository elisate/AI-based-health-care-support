import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PatientSymptomForm() {
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

  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [prediction, setPrediction] = useState(null);

  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const userId = userToken?.user?.user_id;
  const authToken = userToken?.token;

  const handleSymptomChange = (e) => {
    setSelectedSymptom(e.target.value);
  };

  const addSymptom = () => {
    if (selectedSymptom && !symptoms.includes(selectedSymptom)) {
      const updatedSymptoms = [...symptoms, selectedSymptom];
      setSymptoms(updatedSymptoms);
      setValue("symptoms", updatedSymptoms);
      setSelectedSymptom("");
    }
  };

  const removeSymptom = (symptomToRemove) => {
    const updatedSymptoms = symptoms.filter((s) => s !== symptomToRemove);
    setSymptoms(updatedSymptoms);
    setValue("symptoms", updatedSymptoms);
  };

  const loadSampleData = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setValue("user_id", user.user_id);
    }
    setValue("location", "New York");
    const sampleSymptoms = ["Fever", "Cough"];
    setSymptoms(sampleSymptoms);
    setValue("symptoms", sampleSymptoms);
  };

  const onsubmit = async (data) => {
    let userToken = JSON.parse(localStorage.getItem("userToken"));
    const authToken = userToken?.token;
    try {
      const res = await axios.post(
        "http://localhost:8000/recommend/resourceFinder",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Submitted:", res.data);
      alert("Data submitted successfully");

      // Automatically fetch prediction after submission
      fetchPrediction();
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit data");
    }
  };

  const fetchPrediction = async () => {
    let userToken = JSON.parse(localStorage.getItem("userToken"));
    const authToken = userToken?.token;
    try {
      const res = await axios.get(
        "http://localhost:8000/recommend/liveResultPredicted",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Prediction Response:", res.data);

      if (res.data && typeof res.data === "object") {
        setPrediction(res.data);
      } else {
        console.warn("Unexpected prediction format:", res.data);
      }
    } catch (error) {
      console.error("Failed to fetch prediction:", error);
    }
  };

  useEffect(() => {
    fetchPrediction(); // initial fetch on component mount
  }, []);

  return (
    <div className="flex flex-row justify-between pb-[2rem]">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Patient Symptom Form
          </h2>
        </div>

        <div className="mt-6 sm:mt-8 sm:mx-auto w-full sm:max-w-md lg:max-w-lg">
          <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow sm:rounded-lg">
            <form className="space-y-5" onSubmit={handleSubmit(onsubmit)}>
              <div>
                <label
                  htmlFor="user_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Patient ID
                </label>
                <div className="mt-1">
                  <input
                    defaultValue={userId}
                    readOnly
                    {...register("user_id", { required: true })}
                    className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

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
                      .filter((symptom) => !symptoms.includes(symptom))
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

                {symptoms.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2">
                      Selected symptoms:
                    </p>
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
                <input
                  type="hidden"
                  {...register("symptoms")}
                  value={JSON.stringify(symptoms)}
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
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

              <div className="pt-2 flex flex-row sm:space-x-2 sm:space-y-0">
                <button
                  type="submit"
                  className="w-full py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="p-4 shadow-md border border-gray-300 rounded-md bg-white mt-[10rem] w-[23rem]">
        <h1 className="text-lg font-semibold pb-[1rem]">Predicted Output</h1>
        <div>
          {prediction && (
            <div className="p-4 bg-white rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">Diagnosis Result</h2>
              <p>
                <strong>Diagnosis:</strong> {prediction.diagnosis}
              </p>

              <div className="mt-4">
                <p className="font-semibold">Recommended Doctors:</p>
                <ul className="list-disc ml-5">
                  {prediction.recommended_doctors?.map((doctor, index) => (
                    <li key={index}>{doctor}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-semibold">Medical Supplies:</p>
                <ul className="list-disc ml-5">
                  {prediction.medical_supplies?.map((supply, index) => (
                    <li key={index}>{supply}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-semibold">Medical Resources:</p>
                <ul className="list-disc ml-5">
                  {prediction.medical_resources?.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-semibold">Recommended Hospitals:</p>
                <ul className="list-disc ml-5 ">
                  {prediction.recommended_hospitals?.map((hospital, index) => (
                    <li key={index}>{hospital}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
