import React, { useState } from 'react'
import '../dashboardstyles/sidebar.css';
import { Link } from 'react-router-dom';
import { SiEventstore } from "react-icons/si";
import { BiSupport } from "react-icons/bi";

import { FaUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { MdSettings } from "react-icons/md";
import useLogout from '../hooks/useLogout';
const Patientsidebar = () => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  const logout = useLogout();
  return (
    <div className="flex flex-col">
      <div className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
        <div className="topbar">
          <h3 className='side'>MediConnect</h3>
        </div>
        <ul className="nav-list">
          <Link to="patient-pro" className='nav-link'><li><FaUser className='nav-icon' /> Your Profile</li></Link>
         
          <Link to="/patient/event" className='nav-link'><li><SiEventstore className='nav-icon' /> Event Management</li></Link>
          <Link to="/patient/support" className='nav-link'><li><BiSupport className='nav-icon' /> Support</li></Link>
          <Link to="/patient/settings" className='nav-link'><li><MdSettings  className='nav-icon' /> Settings</li></Link>
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


export default Patientsidebar