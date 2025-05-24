import React, { useEffect, useState } from "react";
import { CalendarDays, Check, X, Eye } from "lucide-react";
import "../dashboardstyles/table.css";
import { formatTimeToAmPm } from "../utils/Day_Time_Date";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Confirm from "../utils/confirmCofig";

const AssignedAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleViewAppointment = (appointment_id) => {
    navigate(`/singleAppointment/${appointment_id}`);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/recommend/appointment/by-doctor-email/elisadush2000@gmail.com"
        );
        const result = await response.json();

        if (Array.isArray(result.appointments)) {
          const formattedAppointments = result.appointments.map((apt) => ({
            appointment_id: apt.appointment_id,
            date: apt.date,
            day: apt.day,
            start_time: apt.start_time,
            end_time: apt.end_time,
            status: apt.status,
            firstname: apt.patient?.name?.split(" ")[0] || "Unknown",
            lastname: apt.patient?.name?.split(" ")[1] || "",
          }));
          setAppointments(formattedAppointments);
          setTotalAppointments(formattedAppointments.length);
        } else {
          setAppointments([]);
          setTotalAppointments(0);
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setAppointments([]);
        setTotalAppointments(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
            Total: {totalAppointments}
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
                    <th className="px-3 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tl-lg bg-blue-500 text-white">
                      Patient Name
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
                  {currentAppointments.map((apt) => (
                    <tr
                      key={apt.appointment_id}
                      className={`transition-colors ${
                        apt.appointment_id % 2 === 0
                          ? "bg-blue-50 hover:bg-blue-100"
                          : "bg-white hover:bg-blue-50"
                      }`}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center text-lg font-mono bg-blue-100 text-blue-600">
                              {`${apt.firstname?.[0] || ""}${
                                apt.lastname?.[0] || ""
                              }`}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {`${apt.firstname || ""} ${apt.lastname || ""}`
                                .length > 20
                                ? `${apt.firstname || ""} ${
                                    apt.lastname || ""
                                  }`.slice(0, 20) + ".."
                                : `${apt.firstname || ""} ${
                                    apt.lastname || ""
                                  }`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-600">
                          {truncateText(apt.day)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{apt.date}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap hidden lg:table-cell">
                        <div className="text-sm text-gray-600">
                          {formatTimeToAmPm(apt.start_time)} -{" "}
                          {formatTimeToAmPm(apt.end_time)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            apt.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : apt.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : apt.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : apt.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : apt.status === "assigned"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2 items-center">
                          {/* View Appointment */}
                          <div
                            className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 transition"
                            onClick={() =>
                              handleViewAppointment(apt.appointment_id)
                            }
                          >
                            <Eye size={16} className="mr-1" />
                            <span className="text-sm">View</span>
                          </div>

                          {/* Mark as Complete */}
                          <div
                            className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded cursor-pointer hover:bg-green-200 transition"
                            onClick={() =>
                              handleCompleteAppointment(apt.appointment_id)
                            }
                          >
                            <Check size={16} className="mr-1" />
                            <span className="text-sm">Complete</span>
                          </div>

                          {/* Add Comment */}
                          <div
                            className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 transition"
                            onClick={() => handleComment(apt.appointment_id)}
                          >
                            <X size={16} className="mr-1" />
                            <span className="text-sm">Comment</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap justify-center items-center mt-6 gap-2 md:gap-4">
              <div
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 bg-white cursor-pointer hover:scale-105 transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-200 transform-none shadow-none"
                    : ""
                }`}
                onClick={handlePrevPage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Previous
              </div>
              <div className="flex items-center">
                <span className="hidden md:flex items-center gap-1 text-sm md:text-base">
                  Page <span className="font-bold">{currentPage}</span> of{" "}
                  {totalPages}
                </span>
                <span className="flex md:hidden items-center gap-1 text-sm">
                  <div className="flex justify-center items-center h-8 w-8 rounded-full font-bold bg-blue-100 text-blue-600">
                    {currentPage}
                  </div>
                  / {totalPages}
                </span>
              </div>
              <div
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md text-blue-500 bg-white cursor-pointer hover:scale-105 transition-all duration-300 ${
                  currentPage === totalPages
                    ? "bg-gray-200 transform-none shadow-none"
                    : ""
                }`}
                onClick={handleNextPage}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignedAppointment;
