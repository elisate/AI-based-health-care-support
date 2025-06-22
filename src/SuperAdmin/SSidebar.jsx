import React, { useState } from "react";
import "../dashboardstyles/sidebar.css";
import { Link } from "react-router-dom";
import { FaBedPulse } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import {
  MdDashboard,
  MdSettings,
  MdArrowDropDown,
  MdArrowRight,
} from "react-icons/md";
import useLogout from "../hooks/useLogout";

import { FaUserMd, FaUsersCog } from "react-icons/fa";

import { FaHospitalAlt } from "react-icons/fa";

const SSidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDoctorsMenuOpen, setIsDoctorsMenuOpen] = useState(false);
  const [isPatientsMenuOpen, setIsPatientsMenuOpen] = useState(false);
  const [isNursesMenuOpen, setIsNursesMenuOpen] = useState(false);
  const logout = useLogout();

  return (
    <div className="dashboard">
      <div className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
        <div className="topbar">
          <h3 className="side">MediConnect</h3>
        </div>

        <ul className="nav-list">
          <Link to="/super" className="nav-link">
            <li>
              <MdDashboard className="nav-icon" /> Dashboard
            </li>
          </Link>

          <li
            onClick={() => setIsDoctorsMenuOpen(!isDoctorsMenuOpen)}
            className="menu-item"
          >
            <FaHospitalAlt className="nav-icon" /> Hospital
            {isDoctorsMenuOpen ? (
              <MdArrowDropDown className="submenu-icon" />
            ) : (
              <MdArrowRight className="submenu-icon" />
            )}
          </li>
          <ul className={`submenu ${isDoctorsMenuOpen ? "open" : ""}`}>
            <Link to="/Sadd-Hospitals" className="nav-link">
              <li>Add Hospital</li>
            </Link>
            <Link to="/Sall-Hospitals" className="nav-link">
              <li>All Hospital</li>
            </Link>
            {/* <Link to="/Sdoctor-view" className="nav-link">
              <li>Edit Hospital</li>
            </Link> */}
          </ul>

          <Link to="/GeneralPatients">
            <li className="menu-item">
              <FaBedPulse className="nav-icon" /> Patients
            </li>
          </Link>

          <Link to="/GeneralDoctors" className="nav-link">
            <li>
              <FaUserMd className="nav-icon" /> All Doctors
            </li>
          </Link>

          <Link to="/generalUsers" className="nav-link">
            <li>
              <FaUsersCog className="nav-icon" /> General Users
            </li>
          </Link>
          <Link to="/Sdashboard/settings" className="nav-link">
            <li>
              <MdSettings className="nav-icon" /> Settings
            </li>
          </Link>
        </ul>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>

      {!isSidebarVisible && (
        <button className="show-btn" onClick={() => setIsSidebarVisible(true)}>
          <IoMdMenu />
        </button>
      )}
    </div>
  );
};

export default SSidebar;
