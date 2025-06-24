import React, { useState, useEffect } from "react";
import {
  MdMedicationLiquid,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineClose,
} from "react-icons/md";
import { FaUserDoctor, FaBed, FaBedPulse } from "react-icons/fa6";
import { FaAmbulance, FaUserNurse } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import "../dashboardstyles/dashboardview.css";
import profile1 from "../assets/profile1.jpg";
import Areas from "./Area";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
const Dasboardview = () => {
  const [getdoctors, setGetDoctors] = useState([]);

  const [supportRequests, setSupportRequests] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  useEffect(() => {
    const fetchSupportRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/contact//getrequest"
        );
        setSupportRequests(response.data); // Update state with the fetched requests
      } catch (error) {
        console.error("Error fetching support requests:", error);
      }
    };

    fetchSupportRequests();
  }, []);

  //============================================================================
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      const hospitalId = userToken?.role_data?.id;

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/recommend/Appointment/getPatientByHospId/${hospitalId}`
        );
        const data = await response.json();

        if (data.patients && Array.isArray(data.patients)) {
          setPatients(data.patients);
        } else {
          setPatients([]);
        }
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      const hospitalId = userToken?.role_data?.id;

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/recommend/doctor/getDoctorByHospitalId/${hospitalId}`
        );
        const data = await response.json();

        if (data.doctors && Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const userToken = JSON.parse(localStorage.getItem("userToken"));

        const hospitalId = userToken?.role_data?.id;
        if (!hospitalId) {
          setError("Hospital ID not found.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://127.0.0.1:8000/recommend/appointment/getAllPendingAppointmentsByHospId/${hospitalId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.appointments) {
          setAppointments(data.appointments);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAppointments();
  }, []);

  if (loading) return <div>Loading pending appointments...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="dash">
      <div className="widgets">
        <div className="widget">
          <div className="top">
            <div className="icon-container">
              <FaBedPulse className="ordericon" />
            </div>
            <div className="texts">
              {error ? (
                <p style={{ color: "red", fontSize: "1.5rem" }}>{error}</p>
              ) : (
                <>
                  <p>{patients.length}</p>
                  <span>Total Patients</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="widget">
          <div className="top">
            <div className="icon-container">
              <FaUserDoctor className="pageicon" />
            </div>
            <div className="texts">
              {error ? (
                <p style={{ color: "red", fontSize: "1.5rem" }}>{error}</p>
              ) : (
                <>
                  <p>{doctors.length}</p>
                  <span>Available Doctors</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="top">
            <div className="icon-container">
              <FaUserNurse className="downloadicon" />
            </div>
            <div className="texts">
              {error ? (
                <p style={{ color: "red", fontSize: "1.5rem" }}>{error}</p>
              ) : (
                <>
                  <p>{appointments.length}</p>
                  <span>Pending Request</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="second-section">
        <div className="area">
          <p>Hospital Visits Statistics</p> <br />
          <Areas />
        </div>
        <section className="doctors-list">
          <div className="doctors-header">
            <h2>Doctors List</h2>
          </div>
          {getdoctors.map((doctor) => (
            <div className="doctor-card" key={doctor._id}>
              <img src={doctor.profileImage} alt="Doctor" />
              <div className="doctor-info">
                <h3>{doctor.userName}</h3>
                <p>{doctor.Speciality}</p>
              </div>
            </div>
          ))}
          <button className="view-all">
            <Link to="/all-doctors" className="nav-link">
              View all doctors
            </Link>
          </button>
        </section>
      </div>
      {/* <div className="sec-widgets">
        <div className="card-modal">
          <div className="top-part">
            <h4>Recent Visits</h4>
            <div className="ico">
              <MdKeyboardArrowUp />
              <IoSettingsSharp />
              <MdOutlineClose />
            </div>
          </div>
        </div>
        <div className="card-modal">
          <div className="top-part">
            <h4>Operation Success Rate </h4>
            <div className="ico">
              <MdKeyboardArrowUp />
              <IoSettingsSharp />
              <MdOutlineClose />
            </div>
          </div>
        </div>
        <div className="card-modal">
          <div className="top-part">
            <h4>Pharmacy Orders</h4>
            <div className="top-icon">
              <MdKeyboardArrowUp />
              <IoSettingsSharp />
              <MdOutlineClose />
            </div>
          </div>
        </div>
      </div> */}
     
    </div>
  );
};

export default Dasboardview;
