import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorDash = () => {
  const _id = localStorage.getItem("doctorId"); // Get doctor ID from localStorage
  const userToken = JSON.parse(localStorage.getItem("userToken")); // Get token from localStorage
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (!_id || !userToken) return;

    const getDoctor = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/recommend/doctor/getDoctorById/${_id}/`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const data = response.data;

        // Create full name fallback if not present
        const fullName = data.full_name || `${data.firstname} ${data.lastname}`;

        // Map backend fields to match your frontend design
        const mappedDoctor = {
          userName: fullName,
          profileImage: data.profile_image_url,
          Speciality: data.specialty,
          userDescription: data.notes,
          userEmail: data.email,
          phoneNumber: data.phone,
          Gender: data.gender,
          userAge: data.age,
        };

        setDoctor(mappedDoctor);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    getDoctor();
  }, [_id, userToken]);

  if (!doctor) {
    return <h6 style={{ fontSize: "1.5rem", color: "red" }}>Doctor Not Found</h6>;
  }

  return (
    <div className="doctor-profile">
      <div className="profile-card">
        <div className="profile-body">
          <img src={doctor.profileImage} alt="Doctor Profile" />
          <h2>{doctor.userName}</h2>
          <p className="expertise"><strong>{doctor.Speciality}</strong></p>
          <p className="description">{doctor.userDescription}</p>
          <p><strong>Email:</strong> <a href={`mailto:${doctor.userEmail}`}>{doctor.userEmail}</a></p>
          <p><strong>Phone:</strong> {doctor.phoneNumber}</p>
        </div>
      </div>

      <div className="specialiity">
        <h3>Personal Information</h3>
        <ul className="info">
          <li><strong>Names:</strong> {doctor.userName}</li>
          <li><strong>Gender:</strong> {doctor.Gender}</li>
          <li><strong>Age:</strong> {doctor.userAge}</li>
          <li><strong>Phone:</strong> {doctor.phoneNumber}</li>
          <li><strong>E-mail:</strong> {doctor.userEmail}</li>
          <li><strong>Speciality:</strong> {doctor.Speciality}</li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorDash;
