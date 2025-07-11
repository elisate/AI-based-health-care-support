import React, { useState } from 'react'
import '../dashboardstyles/sidebar.css';
import { Link } from 'react-router-dom';
import { FaUserDoctor, FaBedPulse } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { MdSettings,  MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { BrainCircuit } from "lucide-react";
import { Stethoscope,CalendarCheck2 } from "lucide-react";
import useLogout from '../hooks/useLogout';
const Doctorsidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isPatientsMenuOpen, setIsPatientsMenuOpen] = useState(false);
  const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);
  const [isBillMenuOpen, setIsBillMenuOpen] = useState(false);
  const [isNursesMenuOpen, setIsNursesMenuOpen] = useState(false);

  const logout = useLogout();
  return (
    <div className="dashboard">
      <div className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
        <div className="topbar">
          <h3 className='side'>MediConnect</h3>
          {/* <button className="toggle-btn" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
            <IoMdMenu />
          </button> */}
        </div>
        <ul className="nav-list">
           <Link to="/doctor/dash" className='nav-link'><li><FaUserDoctor className='nav-icon' /> Doctor Profile</li></Link>
          <Link to="/doctor/AIassistant" className='nav-link'><li><Stethoscope className='nav-icon' /><BrainCircuit size={13}/> AI Assistant</li></Link>
          <Link to="/doctor/Appointment" className='nav-link'><li><CalendarCheck2 className='nav-icon' />Assigned Appointment</li></Link>
          <li onClick={() => setIsPatientsMenuOpen(!isPatientsMenuOpen)} className="menu-item">
            <FaBedPulse className='nav-icon' /> Patients
            {isPatientsMenuOpen ? <MdArrowDropDown className='submenu-icon' /> : <MdArrowRight className='submenu-icon' />}
          </li>
          <ul className={`submenu ${isPatientsMenuOpen ? "open" : ""}`}>
            <Link to="/doctor/all-patients" className='nav-link'><li>All Patients</li></Link>
            {/* <Link to="/doctor/add-patient" className='nav-link'><li>Add Patient</li></Link> */}
            {/* <Link to="/doctor/edit-patient" className='nav-link'><li>Edit Patient</li></Link>
            <Link to="/doctor/patient-pro" className='nav-link'><li>Patient Profile</li></Link> */}
          </ul>
         
           
          <Link to="/doctor/settings" className='nav-link'><li><MdSettings className='nav-icon' /> Settings</li></Link>
        
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
    </div >
  );
}

export default Doctorsidebar
