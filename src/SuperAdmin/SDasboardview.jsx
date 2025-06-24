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
import SArea from "./SArea";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { Import } from "lucide-react";
const SDasboardview = () => {
  const [supportRequests, setSupportRequests] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [users, setUsers] = useState([]);
  const [hospital, setHospital] = useState([]);
  const[prediction,setPrediction]=useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/recommend/getAllUsers`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(res.data.users); // assuming the API returns { users: [...] }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getAllUsers();
  }, []); // only run on component mount

  useEffect(() => {
    const getAllHospitals = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/recommend/getAllHospitals`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setHospital(response.data.hospitals);
      } catch (error) {}
    };
    getAllHospitals();
  }, []);
  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/recommend/getAllDoctors`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setDoctor(res.data.doctors);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getAllDoctors();
  }, []); // only run on component mount
  useEffect(() => {
    const getAllPrediction = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/recommend/getAllPredictions`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setPrediction(res.data.predictions);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getAllPrediction();
  }, []); // only run on component mount
  return (
    <div className="dash">
      <div className="widgets">
        <div className="widget">
          <div className="top">
            <div className="icon-container">
              <FaBedPulse className="ordericon" />
            </div>
            <div className="texts">
              <>
                <p>{users.length}</p>
                <span>Total Users</span>
              </>
            </div>
          </div>
        </div>
        <div className="widget">
          <div className="top">
            <div className="icon-container">
              <FaUserDoctor className="pageicon" />
            </div>
            <div className="texts">
              <>
                <p>{hospital.length}</p>
                <span>Total Hospitals</span>
              </>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="top">
            <div className="icon-container">
              <FaUserNurse className="downloadicon" />
            </div>
            <div className="texts">
              <>
                <p>{doctor.length}</p>
                <span>Total Doctors</span>
              </>
            </div>
          </div>
        </div>
      </div>
      <div className="second-section">
        <div className="area">
          <p>System Visits Statistics</p> <br />
          <SArea />
        </div>
        <section className="doctors-list">
          <div className="doctors-header">
            <h2>No Of AI Prediction</h2>
          </div>
          
          <button className="view-all">
            <Link to="/all-doctors" className="nav-link">
              {prediction.length}
            </Link>
          </button>
        </section>
      </div>

      <div className="third-section">
        
        
      </div>
    </div>
  );
};

export default SDasboardview;
