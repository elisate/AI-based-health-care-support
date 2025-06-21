import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, User, AlertCircle } from "lucide-react";

const AddPatient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [patient, setPatient] = useState(null); // ✅ Added patient state

  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const hospitalId = userToken?.role_data?.id;

  const handleSearch = async () => {
    if (!nationalId.trim()) {
      setError("Please enter a National ID");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/recommend/loadPatientData",
        {
          national_id: nationalId,
        }
      );
      if (res.data && res.data.patient) {
        setPatient(res.data.patient); // ✅ Store fetched patient
        Notify.success("Patient data loaded successfully.");
      } else {
        setPatient(null);
        setError("Patient not found. Please check the National ID and try again.");
      }
    } catch (err) {
      setPatient(null);
      setError("Patient not found or server error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 13) {
      setNationalId(value);
      setError("");
    }
  };

  const onsubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (let key in data) {
        if (key === "profile_image") {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }
      formData.append("hospital_id", hospitalId);

      const response = await axios.post(
        `http://127.0.0.1:8000/recommend/patient/create`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        Notify.success("Patient Added Successfully");
        reset();
      } else {
        Notify.failure("Registration Failed. Please try again!!");
      }
    } catch (error) {
      console.log(error);
      Notify.failure("Something went wrong. Please try again!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-6 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Search Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Patient Data Search
          </h1>
          <p className="text-gray-600 text-lg">
            Enter a National ID to retrieve patient information
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label
              htmlFor="nationalId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              National ID Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="nationalId"
                value={nationalId}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter 13-digit National ID"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                minLength="1"
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Format: 13 digits (e.g., 1234567890123)
            </p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search Patient</span>
              </>
            )}
          </button>

          {/* ✅ View Profile Button */}
          {patient && (
            <Link to={`/patients/${patient.national_id}`}>
              <button className="w-full sm:w-auto mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center">
                View Full Profile
              </button>
            </Link>
          )}
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="bg-white mt-10 border border-blue-500 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Add New Patient
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                First Name
              </label>
              <input
                {...register("firstname", { required: true })}
                type="text"
                placeholder="First Name"
                className="w-full border border-blue-500 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Last Name
              </label>
              <input
                {...register("lastname", { required: true })}
                type="text"
                placeholder="Last Name"
                className="w-full border border-blue-500 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="w-full border border-blue-500 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="w-full border border-blue-500 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                National ID
              </label>
              <input
                {...register("national_id", { required: true })}
                type="text"
                placeholder="National ID"
                className="w-full border border-blue-500 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Age
              </label>
              <input
                {...register("age", { required: true })}
                type="text"
                placeholder="Age"
                className="w-full border border-blue-500 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Gender
              </label>
              <select
                {...register("gender", { required: true })}
                className="w-full border border-blue-500 rounded-md p-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Phone
              </label>
              <input
                {...register("phone", { required: true })}
                type="text"
                placeholder="Phone Number"
                className="w-full border border-blue-500 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Height (cm)
              </label>
              <input
                {...register("height", { required: true })}
                type="text"
                placeholder="Height"
                className="w-full border border-blue-500 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Weight (kg)
              </label>
              <input
                {...register("weight", { required: true })}
                type="text"
                placeholder="Weight"
                className="w-full border border-blue-500 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Hospital ID
              </label>
              <input
                value={hospitalId}
                readOnly
                className="w-full border border-blue-500 rounded-md p-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">
                Profile Image
              </label>
              <input
                {...register("profile_image", { required: true })}
                type="file"
                className="w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
