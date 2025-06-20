import React, { useEffect, useState } from "react";
import "../dashboardstyles/topbar.css";
import { IoMdSunny } from "react-icons/io";

import { LuMoonStar } from "react-icons/lu";

import { User } from "lucide-react";
const SNavbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const Fname = userToken?.user?.firstname;
  const Lname = userToken?.user?.lastname;
  const HospitalEmail = userToken?.user?.email;
  const Role = userToken?.user?.userRole;
  const key = userToken?.token;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
      document.body.classList.add("dark-theme");
    } else {
      setIsDarkTheme(false);
      document.body.classList.add("light-theme");
    }
  }, []);
  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const newTheme = !prev;
      document.body.classList.toggle("dark-theme", newTheme);
      document.body.classList.toggle("light-theme", !newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };
  const userName =
    sessionStorage.getItem("AdminName") || sessionStorage.getItem("UserName");
  const userProfile =
    sessionStorage.getItem("AdminProfile") ||
    sessionStorage.getItem("UserProfile");
  return (
    <div className={`navbars ${isDarkTheme ? "dark" : "light"}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkTheme ? <IoMdSunny /> : <LuMoonStar />}
      </button>
      <div className="navbar-profile">
        {/* <img src={userProfile} alt="profile" className="profile-img" />
        <span>{HospitalEmail?.slice(0, 6)}...</span> */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-blue-500 text-sm">
              {HospitalEmail?.slice(0, 9)}...
            </span>
            <span className="text-xs text-gray-400">{Role}</span>
          </div>
        </div>
      </div>
      {/* <MdNotifications className='notifications' /> */}
    </div>
  );
};

export default SNavbar;
