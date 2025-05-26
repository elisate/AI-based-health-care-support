import React from "react";
import "../dashboardstyles/addDoctor.css";
import { useForm } from "react-hook-form";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";
import { useState,useEffect } from "react";
const AddPatient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const userToken = JSON.parse(localStorage.getItem("userToken"));

  const hospitalId = userToken?.role_data?.id;

  const onsubmit = async (data) => {
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
        weight,
        height,
        national_id,
      } = data;
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("password", password);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("weight", weight);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("profile_image",profile_image[0]);
      formData.append("hospital_id", hospitalId);
      formData.append("height", height);
      formData.append("national_id", national_id);
      const response = await axios.post(
        `http://127.0.0.1:8000/recommend/patient/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        }
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
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="forms">
        <div className="heades-container">
          <h1 className="heades-title">ADD NEW PATIENT</h1>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <h2>Patient info</h2>
          <label className="label">First Name</label>
          <input
            type="text"
            placeholder="FirstName"
            name="firstname"
            {...register("firstname", { required: true })}
          />
          <label className="label">LastName</label>
          <input
            type="text"
            placeholder="LastName"
            name="lastname"
            {...register("lastname", { required: true })}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", { required: true })}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", { required: true })}
          />
          <label>National Id</label>
          <input
            type="text"
            placeholder="National Id"
            name="national_id"
            {...register("national_id", {
              required: true,
            })}
          />

          <label>Age</label>
          <input
            type="text"
            placeholder="Age"
            name="age"
            {...register("age", { required: true })}
          />
          <label>Gender</label>
          <select {...register("gender", { required: true })}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            {...register("phone", { required: true })}
          />
          {/* <label >Disease</label>
          <input type="text" placeholder='Patient Disease' name='patientDisease' {...register("patientDisease", {required: true})}/> */}
          <label>Height</label>
          <input
            type="text"
            placeholder="Patient Height (Cm)"
            name="height"
            {...register("height", { required: true })}
          />
          <label>Weight</label>
          <input
            type="text"
            placeholder="Patient Weight (Kgs)"
            name="weight"
            {...register("weight", { required: true })}
          />
          <label>Hospital ID</label>
          <input
            type="text"
            placeholder="Hospital Id"
            value={hospitalId}
            readOnly
            {...register("patientKgs", { required: true })}
          />
          <label>Profile Image</label>
          <input
            type="file"
            {...register("profile_image", { required: true })}
          />
          {/* <textarea  id="" placeholder='Notes for Patient include Medications given' name='patientDescription' {...register("patientDescription", {required: true})}></textarea> <br /> */}
          <button className="doctor-btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          {/* <button type="reset" value="Cancel" className='cancel' >Cancel</button> */}
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
