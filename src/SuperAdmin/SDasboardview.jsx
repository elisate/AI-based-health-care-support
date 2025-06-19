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
        
        <div className="table-section" style={{ marginTop: "0rem" }}>
          <div className="top-section">
            <h2>Support Requests</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {supportRequests.map((request) => (
                <React.Fragment key={request._id}>
                  <tr>
                    <td>{request.fullName}</td>
                    <td>{request.email}</td>
                    <td>{request.message}</td>
                    <td>{new Date(request.createdAt).toLocaleString()}</td>
                    <td style={{ color: "green" }}>{request.status}</td>
                    <td>
                      <span
                        className="edit"
                        style={{
                          fontSize: "1rem",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() =>
                          setSelectedRequestId(
                            selectedRequestId === request._id
                              ? null
                              : request._id
                          )
                        }
                      >
                        Reply
                      </span>
                    </td>
                  </tr>

                  {/* Show Reply Form Below Row If Selected */}
                  {selectedRequestId === request._id && (
                    <tr>
                      <td colSpan="6">
                        <form
                          onSubmit={(e) =>
                            handleReplySubmit(e, request._id, request.email)
                          }
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Type your reply..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            required
                            style={{ flex: 1, padding: "5px" }}
                          />
                          <button
                            className="edit"
                            type="submit"
                            style={{ padding: "5px 10px", cursor: "pointer" }}
                          >
                            Send
                          </button>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SDasboardview;
