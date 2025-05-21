import React, { useEffect, useState } from "react";
import "../dashboardstyles/topbar.css";


import { Sun, Moon, User } from "lucide-react";
const DoctorNavbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const Fname = userToken?.user?.firstname;
  const Lname = userToken?.user?.lastname;

  const Role = userToken?.user?.userRole;
  const key = userToken?.token;

useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkTheme(false);
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    } else {
      setIsDarkTheme(true);
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
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

 
  return (
    
         <nav
      className={`fixed top-0 h-14 ml-[16rem] w-[calc(100%-16rem)] pl-[50rem] sm xl lg-h-16 ${
        isDarkTheme ? "bg-[#181818]" : "bg-white shadow-lg"
      } text-white z-50 transition-all`}
    >
      <div className="h-full px-6 flex flex-row items-center gap-9 ">
        {/* Left side with user info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-blue-500 text-sm">{Lname}</span>
            <span className="text-xs text-gray-400">{Role}</span>
          </div>
        </div>
        
        {/* Right side with theme toggle */}
        <div
          onClick={toggleTheme}
          className="p-2 rounded-full text-blue-500 hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </div>
      </div>
    </nav>
 
  );
};

export default DoctorNavbar;
