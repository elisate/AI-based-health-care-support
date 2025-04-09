import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiEventstore } from "react-icons/si";
import { BiSupport } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { MdSettings } from "react-icons/md";
import { GiMedicines } from "react-icons/gi"; // Added medical resources icon
import useLogout from '../hooks/useLogout';

const Patientsidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const logout = useLogout();

  return (
    <div className="flex flex-col">
      <div className={`sidebar ${isSidebarVisible ? "block" : "hidden"} fixed top-0 left-0 h-full w-64 bg-white text-gray-700 p-5 transition-width duration-300 border-r-3 border-blue-500 shadow-lg overflow-y-auto`}>
        <div className=" flex justify-between items-center mb-12 text-blue-500 p-1">
          <div className='text-blue-500 font-bold text-xl'>MediConnect</div>
        </div>
        <ul className="nav-list space-y-4">
          <Link to="patient-pro" className="nav-link flex items-center text-base font-bold text-gray-700 hover:bg-blue-500 hover:text-white p-3 rounded-md transition-colors">
            <FaUser className='mr-3 text-xl' /> Your Profile
          </Link>
          <Link to="/patient/resources" className="nav-link flex items-center text-base font-bold text-gray-700 hover:bg-blue-500 hover:text-white p-3 rounded-md transition-colors">
            <GiMedicines className='mr-3 text-xl' /> Medical Resources
          </Link>
          <Link to="/patient/event" className="nav-link flex items-center text-base font-bold text-gray-700 hover:bg-blue-500 hover:text-white p-3 rounded-md transition-colors">
            <SiEventstore className='mr-3 text-xl' /> Event Management
          </Link>
          <Link to="/patient/support" className="nav-link flex items-center text-base font-bold text-gray-700 hover:bg-blue-500 hover:text-white p-3 rounded-md transition-colors">
            <BiSupport className='mr-3 text-xl' /> Support
          </Link>
          <Link to="/patient/settings" className="nav-link flex items-center text-base font-bold text-gray-700 hover:bg-blue-500 hover:text-white p-3 rounded-md transition-colors">
            <MdSettings className='mr-3 text-xl' /> Settings
          </Link>
        </ul>
        <button onClick={logout} className="logout-btn w-full bg-blue-500 text-white font-bold py-3 rounded-md mt-4 transition-all hover:bg-blue-600">
          Logout
        </button>
      </div>
      {!isSidebarVisible && (
        <button className="show-btn fixed top-4 left-4 flex items-center justify-center w-12 h-12 bg-white text-black border-none rounded-full shadow-md hover:bg-blue-500 hover:text-white z-50" onClick={() => setIsSidebarVisible(true)}>
          <IoMdMenu className="text-xl" />
        </button>
      )}
    </div>
  );
}

export default Patientsidebar;
