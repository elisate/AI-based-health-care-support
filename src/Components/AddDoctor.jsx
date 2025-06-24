import React, { useEffect, useState } from "react";
import "../dashboardstyles/addDoctor.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";

const AddDoctor = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const userToken = JSON.parse(localStorage.getItem("userToken"));

  const hospitalId = userToken?.role_data?.id;

  const onsave = async (data) => {
    setLoading(true);
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        age,
        gender,
        profile_image,
        phone,
        notes,
        specialty,
      } = data;

      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("password", password);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("specialty", specialty);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("profile_image", profile_image[0]);
      formData.append("hospital_id", hospitalId);
      formData.append("notes", notes);

      const response = await axios.post(
        `http://127.0.0.1:8000/recommend/doctor/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        Notify.success("Doctor Added Successfully");
        reset();
      } else {
        Notify.failure("Adding Doctor failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Notify.failure("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

      <form
        onSubmit={handleSubmit(onsave)}
        className="bg-white mt-10  border border-blue-500 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold text-blue-600 mb-4">Add New Doctor</h2>
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
              Specialty
            </label>
            <input
              {...register("specialty", { required: true })}
              type="text"
              placeholder="Specialty"
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
          <div className="sm:col-span-2">
            <label className="block text-blue-600 font-semibold mb-1">
              Notes
            </label>
            <textarea
              {...register("notes", { required: true })}
              placeholder="Doctor Description"
              className="w-full border border-blue-500 rounded-md p-2"
            ></textarea>
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
   
  );
};

export default AddDoctor;
