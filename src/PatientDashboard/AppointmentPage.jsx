import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  Hospital,
  Package,
  List,
  FileText,
  Clock3,
  Calendar as CalendarIcon,
} from "lucide-react";

// Helper to convert 24-hour time to 12-hour format with AM/PM
const formatTo12Hour = (time24) => {
  const [hour, minute] = time24.split(":");
  const h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedHour = h % 12 === 0 ? 12 : h % 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

function AppointmentPage() {
  const { id } = useParams(); // /patient/findAppointment/:prediction_id
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState(null);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/recommend/liveResultPredicted/predictions/${id}/`
        );
        const data = response.data;
        setPrediction(data);

        const firstHospital = data?.recommended_hospitals?.[0];
        if (firstHospital) {
          fetchScheduleByHospitalName(firstHospital);
        }
      } catch (error) {
        console.error("Error fetching prediction:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchScheduleByHospitalName = async (hospitalName) => {
      setScheduleLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/recommend/schedule/getByHospitalName/${encodeURIComponent(
            hospitalName
          )}`
        );
        setSchedule(response.data.schedule);
      } catch (error) {
        console.error("Error fetching hospital schedule:", error);
      } finally {
        setScheduleLoading(false);
      }
    };

    fetchPrediction();
  }, [id]);

  const handleRequestAppointment = (day, slot) => {
    setSelectedTimeSlot({ day, slot });
    // Implement your booking logic here
    console.log(`Requesting appointment for ${day} at ${slot.start_time}-${slot.end_time}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (!prediction)
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg">
        <p className="text-red-500 font-medium">
          No prediction data found for this ID.
        </p>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-800 border-b pb-2">
            Appointment Details
          </h1>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <div className="flex items-start mb-3">
                <Stethoscope className="mr-2 text-blue-500 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Diagnosis</p>
                  <p className="font-semibold">{prediction.diagnosis}</p>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <MapPin className="mr-2 text-blue-500 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="font-semibold">{prediction.location}</p>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <List className="mr-2 text-blue-500 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Symptoms</p>
                  <p>{prediction.symptoms?.join(", ")}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-start mb-3">
                <Hospital className="mr-2 text-blue-500 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Recommended Hospitals</p>
                  <p className="font-semibold">
                    {prediction.recommended_hospitals?.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <Package className="mr-2 text-blue-500 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Medical Resources</p>
                  <p>{prediction.medical_resources?.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <Package className="mr-2 text-blue-500 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Medical Supplies</p>
                  <p>{prediction.medical_supplies?.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-start mb-2">
              <FileText className="mr-2 text-blue-500 mt-1" size={18} />
              <div>
                <p className="text-sm text-gray-500 font-medium">Prediction ID</p>
                <p className="font-mono">{prediction.prediction_id}</p>
              </div>
            </div>
            <div className="flex items-start">
              <CalendarIcon className="mr-2 text-blue-500 mt-1" size={18} />
              <div>
                <p className="text-sm text-gray-500 font-medium">Created At</p>
                <p>{new Date(prediction.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Calendar className="mr-2 text-blue-500" size={20} />
            <h2 className="text-xl font-semibold">
              Schedule for {prediction.recommended_hospitals?.[0]}
            </h2>
          </div>

          {scheduleLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : schedule ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(schedule).map((day) => (
                <div key={day} className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-50 p-3">
                    <h3 className="font-medium capitalize text-blue-700">{day}</h3>
                  </div>
                  <div className="p-3">
                    {schedule[day].length > 0 ? (
                      <ul className="space-y-2">
                        {schedule[day].map((slot, idx) => (
                          <li key={idx} className="rounded-md border p-3 hover:bg-gray-50">
                            <div className="flex flex-col">
                              
                                <div className="text-sm font-medium">
                                  <span className="flex items-center">
                                    <Calendar className="mr-1 text-gray-400" size={14} />
                                    <span className="text-sm text-blue-300">{slot.date}</span>
                                  </span>
                                </div>
                                <hr className="border-t-1 border-blue-600" />
                                <div className="flex items-center text-blue-500 mt-1">
                                  <Clock className="mr-1" size={14} />
                                  {formatTo12Hour(slot.start_time)} - {formatTo12Hour(slot.end_time)}
                                </div>
                           
                                <button
                                onClick={() => handleRequestAppointment(day, slot)}
                                className="flex items-center w-24 px-2 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600"
                              >
                                <Clock3 size={14} className="mr-1" />
                                Request
                              </button>
                              
                              
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-4 text-gray-400">
                        <Clock className="mx-auto mb-1" size={20} />
                        <p className="text-sm">No time slots available</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No schedule available for this hospital.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedTimeSlot && (
          <form>
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">
                  Confirm Appointment Request
                </h3>
                <p><span className="font-medium">Day:</span> {selectedTimeSlot.day}</p>
                <p><span className="font-medium">Date:</span> {selectedTimeSlot.slot.date}</p>
                <p><span className="font-medium">Time:</span> {formatTo12Hour(selectedTimeSlot.slot.start_time)} - {formatTo12Hour(selectedTimeSlot.slot.end_time)}</p>
                <p><span className="font-medium">Hospital:</span> {prediction.recommended_hospitals?.[0]}</p>

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={() => setSelectedTimeSlot(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert("Appointment requested successfully!");
                      setSelectedTimeSlot(null);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Confirm Request
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AppointmentPage;
