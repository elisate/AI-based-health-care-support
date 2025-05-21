import React, { useEffect, useState } from "react";
import { CalendarDays, Check, Eye } from "lucide-react";
import { formatTimeToAmPm } from "../utils/Day_Time_Date";
import "../dashboardstyles/table.css";

const PatientEvents = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAppointments, setTotalAppointments] = useState(0);

  const pageSize = 5; // Should match backend page size

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const userId = userToken?.user?.user_id;

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/recommend/Appointment/getAppointmentByUserId/${userId}?page=${currentPage}`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setAppointments(data);
          setTotalAppointments(data.length);
          setTotalPages(1);
        } else if (Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
          setTotalAppointments(data.pagination?.total_appointments || data.appointments.length);
          setTotalPages(data.pagination?.total_pages || 1);
        } else {
          console.error("Unexpected response format:", data);
          setAppointments([]);
          setTotalAppointments(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setAppointments([]);
        setTotalAppointments(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentPage]);

  const truncateText = (text, maxLength = 20) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-16 rounded-xl shadow-lg bg-white text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarDays size={28} className="text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Requested Appointments
            </h1>
          </div>
          <div className="text-base md:text-lg font-medium text-gray-500">
            Total Appointments: {totalAppointments}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400">
              <table className="min-w-[800px] w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider hidden md:table-cell bg-blue-500 text-white">
                      Hospital Name
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider hidden md:table-cell bg-blue-500 text-white">
                      Day
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider bg-blue-500 text-white">
                      Date
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider hidden lg:table-cell bg-blue-500 text-white">
                      Time
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider bg-blue-500 text-white">
                      Status
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tr-lg bg-blue-500 text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((apt) => (
                    <tr key={apt.appointment_id} className="transition-colors bg-blue-50 hover:bg-blue-100">
                      <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-600">
                          {truncateText(apt.hospital_name || "")}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-600">
                          {truncateText(apt.day || "")}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{apt.date}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap hidden lg:table-cell">
                        <div className="text-sm text-gray-600">
                          {formatTimeToAmPm(apt.start_time)} - {formatTimeToAmPm(apt.end_time)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            apt.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2 items-center">
                          <div className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 transition">
                            <Eye size={16} className="mr-1" />
                            <span className="text-sm">View</span>
                          </div>
                          <div className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded cursor-pointer hover:bg-green-200 transition">
                            <Check size={16} className="mr-1" />
                            <span className="text-sm">Comment</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-center items-center mt-6 gap-2 md:gap-4">
  {/* Previous Button */}
  <div
    className="flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500  cursor-pointer
    hover:scale-105 transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
    disabled={currentPage === 1}
    onClick={handlePrevPage}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
    Previous
  </div>

  {/* Page Indicator */}
  <div className="flex items-center">
    {/* Desktop version */}
    <span className="hidden md:flex items-center gap-1 text-sm md:text-base">
      Page <span className="font-bold">{currentPage}</span> of {totalPages}
    </span>
    {/* Mobile version - more compact */}
    <span className="flex md:hidden items-center gap-1 text-sm">
      <div className="flex justify-center items-center h-8 w-8 rounded-full font-bold bg-blue-100 text-blue-600">{currentPage}</div>
      / {totalPages}
    </span>
  </div>

  {/* Next Button */}
  <div
    className="flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 cursor-pointer hover:scale-105 transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
    disabled={currentPage === totalPages}
    onClick={handleNextPage}
  >
    Next
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  </div>
</div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientEvents;
