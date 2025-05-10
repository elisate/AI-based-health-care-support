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
    
    const hospitalId=userToken?.user?.hospital_id
     
    


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
    <div>
      <div className="forms">
        <div className="heades-container">
          <h1 className="heades-title">ADD NEW DOCTOR</h1>
        </div>
        <form onSubmit={handleSubmit(onsave)}>
          <h2>Doctor info</h2>

          <label className="label">FirstName</label>
          <input
            type="text"
            placeholder="FirstName"
            {...register("firstname", { required: true })}
          />

          <label className="label">LastName</label>
          <input
            type="text"
            placeholder="LastName"
            {...register("lastname", { required: true })}
          />

          <label>Age</label>
          <input
            type="text"
            placeholder="Age"
            {...register("age", { required: true })}
          />

          <label>Gender</label>
          <select {...register("gender", { required: true })}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Profile Image</label>
          <input
            type="file"
            {...register("profile_image", { required: true })}
          />

          <label>Speciality</label>
          <input
            type="text"
            placeholder="Speciality"
            name="specialty"
            {...register("specialty", { required: true })}
          />

          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: true })}
          />

          <label>Hospital Id</label>
          <input
            type="text"
            placeholder="hospital_id"
            value={hospitalId}
            readOnly
          />

          <label className="label">Email</label>
          <input
            type="email"
            placeholder="E-mail"
            {...register("email", { required: true })}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <label>Notes</label>
          <textarea
            placeholder="Doctor Description"
            {...register("notes", { required: true })}
          ></textarea>

          <button className="doctor-btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
