import React, { useState } from "react";
import "../dashboardstyles/sidebar.css";
import { Link } from "react-router-dom";
import { SiEventstore } from "react-icons/si";
import { BiSupport } from "react-icons/bi";
import {
  FaHeartbeat,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaUserNurse,
} from "react-icons/fa";
import { FaUserDoctor, FaBedPulse } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import {
  MdDashboard,
  MdSettings,
  MdArrowDropDown,
  MdArrowRight,
} from "react-icons/md";
import useLogout from "../hooks/useLogout";

import { FaUserMd, FaUsersCog } from "react-icons/fa";
// import { MdSettings } from "react-icons/md";

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
          {/* <button className="toggle-btn" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
                        <IoMdMenu />
                    </button> */}
        </div>

        <ul className="nav-list">
          <Link to="/super" className="nav-link">
            <li>
              <MdDashboard className="nav-icon" /> Dashboard
            </li>
          </Link>
          {/* <Link to="/patient-dashboard" className='nav-link'><li><FaHeartbeat className='nav-icon' /> Patient Dashboard</li></Link> */}
          {/* <Link to="/dashboard/doctor-dashboard" className='nav-link'><li><MdDonutSmall className='nav-icon' /> Doctor Dashboard</li></Link> */}

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
            <Link to="/Sadd-doctor" className="nav-link">
              <li>Add Hospital</li>
            </Link>
            <Link to="/Sall-doctors" className="nav-link">
              <li>All Hospital</li>
            </Link>
            <Link to="/Sdoctor-view" className="nav-link">
              <li>Edit Hospital</li>
            </Link>
          </ul>

          <li
            onClick={() => setIsPatientsMenuOpen(!isPatientsMenuOpen)}
            className="menu-item"
          >
            <FaBedPulse className="nav-icon" /> Patients
          </li>

          <Link to="/ScreateSchedule" className="nav-link">
            <li>
              <FaUserMd className="nav-icon" /> All Doctors
            </li>
          </Link>

          <Link to="/Sevents" className="nav-link">
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
