import React, { useState } from "react";
import "../dashboardstyles/addDoctor.css";
import { useForm } from "react-hook-form";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";

const SHospitalCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSave = async (data) => {
    setLoading(true);
    try {
      // Prepare data according to your sample JSON:
      const payload = {
        hospital_name: data.hospital_name,
        email: data.email,
        password: data.password,
        location: data.location,
        contact: data.contact,
        Medical_Supplies: data.Medical_Supplies
          ? data.Medical_Supplies.split(",").map((item) => item.trim())
          : [],
        Medical_Resources: data.Medical_Resources
          ? data.Medical_Resources.split(",").map((item) => item.trim())
          : [],
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/recommend/hospitals/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        Notify.success("Hospital Added Successfully");
        reset();
      } else {
        Notify.failure("Adding Hospital failed. Please try again.");
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
          <h1 className="heades-title">ADD NEW Hospital</h1>
        </div>
        <form onSubmit={handleSubmit(onSave)}>
          <h2>Hospital info</h2>

          <label className="label">Hospital Name</label>
          <input
            type="text"
            placeholder="Hospital Name"
            {...register("hospital_name", { required: true })}
          />

          <label>Email</label>
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

          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
          />

          <label>Contact</label>
          <input
            type="text"
            placeholder="Contact Number"
            {...register("contact", { required: true })}
          />

          <label>Medical Supplies (comma separated)</label>
          <input
            type="text"
            placeholder="e.g. Antibiotics, Bandages"
            {...register("Medical_Supplies")}
          />

          <label>Medical Resources (comma separated)</label>
          <input
            type="text"
            placeholder="e.g. Oxygen Therapy Machine, MRI Scanner"
            {...register("Medical_Resources")}
          />

          <button className="doctor-btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SHospitalCreate;
