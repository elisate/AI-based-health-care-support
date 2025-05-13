import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
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
  const { register, handleSubmit, setValue, reset } = useForm();
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
      reset();
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
    <>
      <div className="text-3xl font-extrabold text-gray-900 mb-8 pl-6 pb-2">
        <span className="border-b-4 border-blue-500">Patient </span>Symptom
        Checker & AI Diagnosis
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8 p-6 bg-gray-50 min-h-screen">
        <div className="flex-1 flex flex-col justify-start">
          <div className="w-full max-w-xl mx-auto">
            <div className="bg-white py-8 px-6 rounded-xl shadow-lg border border-gray-100">
              <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
                <div className="text-xl font-bold pb-4 border-b border-gray-200 text-blue-500 flex items-center">
                  Input Form
                </div>
                <div>
                  <label
                    htmlFor="user_id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Patient ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      defaultValue={userId}
                      readOnly
                      {...register("user_id", { required: true })}
                      className="appearance-none bg-gray-50 block w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Symptoms
                  </label>
                  <div className="mt-1 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <select
                      value={selectedSymptom}
                      onChange={handleSymptomChange}
                      className="flex-grow appearance-none px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
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
                      className="px-5 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      Add
                    </button>
                  </div>

                  {symptoms.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Selected symptoms:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {symptoms.map((symptom, index) => (
                          <div
                            key={index}
                            className="bg-blue-100 text-blue-500 text-sm px-3 py-1.5 rounded-full flex items-center transition-all hover:bg-blue-200"
                          >
                            {symptom}
                            <IoClose
                              type="button"
                              onClick={() => removeSymptom(symptom)}
                              className="ml-1.5 text-red-500  focus:outline-none rounded-full hover:bg-blue-300 w-5 h-5 inline-flex items-center justify-center transition-colors cursor-pointer"
                              aria-label={`Remove ${symptom}`}
                            ></IoClose>
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
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="location"
                      {...register("location")}
                      type="text"
                      placeholder="Enter your location"
                      className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className=" py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                    Predict
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-auto lg:mt-0">
          <div className="p-6 shadow-lg border border-gray-200 rounded-xl bg-white">
            <h1 className="text-xl font-bold pb-4 border-b border-gray-200 text-blue-500 flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
              Predicted Output
            </h1>

            <div className="mt-4">
              {prediction ? (
                <div className="rounded-lg bg-gray-50 p-5">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-blue-200 pb-2">
                    Diagnosis Result
                  </h2>
                  <p className="mb-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <span className="font-medium text-blue-500">
                      Diagnosis:
                    </span>{" "}
                    {prediction.diagnosis}
                  </p>

                  <div className="mb-4">
                    <p className="font-semibold text-blue-500 mb-2">
                      Recommended Doctors:
                    </p>
                    <ul className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      {prediction.recommended_doctors?.map((doctor, index) => (
                        <li
                          key={index}
                          className="mb-1 flex items-center text-black"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                          </svg>
                          {doctor}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-blue-500 mb-2">
                      Medical Supplies:
                    </p>
                    <ul className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      {prediction.medical_supplies?.map((supply, index) => (
                        <li
                          key={index}
                          className="mb-1 flex items-center text-black"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            ></path>
                          </svg>
                          {supply}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-blue-500 mb-2">
                      Medical Resources:
                    </p>
                    <ul className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      {prediction.medical_resources?.map((resource, index) => (
                        <li
                          key={index}
                          className="mb-1 flex items-center text-black"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            ></path>
                          </svg>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-500 mb-2">
                      Recommended Hospitals:
                    </p>
                    <ul className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      {prediction.recommended_hospitals?.map(
                        (hospital, index) => (
                          <li
                            key={index}
                            className="mb-1 flex items-center text-black"
                          >
                            <svg
                              className="w-4 h-4 mr-2 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              ></path>
                            </svg>
                            {hospital}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <hr className="border-blue-500 border-t-2 my-4" />
                  </div>

                  <div>
                    {" "}
                    <span className="text-sm cursor-pointer">
                      Request Appointment
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <p className="mt-2">No prediction data available</p>
                    <p className="text-sm">Submit the form to see results</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
