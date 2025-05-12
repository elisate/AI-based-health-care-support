import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../other_component/Dialog";
import { formatTime, formatDate, formatDay } from "../utils/Day_Time_Date";
import TimeSlotModal from "./TimeSlotModal";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineCalendar,
} from "react-icons/ai";
 import { IoMdClose } from "react-icons/io";
const HospitalSchedule = () => {
  const [schedule, setSchedule] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [userId, setUserId] = useState(null);
  const [editingSlot, setEditingSlot] = useState(null);

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
      fetchSchedule(storedUser.id);
    }
  }, []);

  const fetchSchedule = async (userId) => {
    try {
      // For demonstration, using sample data
      const sampleData = {
        monday: [
          { start_time: "08:00", end_time: "12:00", date: "2025-05-13" },
          { start_time: "14:00", end_time: "18:00", date: "2025-05-13" },
        ],
        tuesday: [
          { start_time: "08:00", end_time: "12:00", date: "2025-05-13" },
          { start_time: "14:00", end_time: "18:00", date: "2025-05-13" },
        ],
        wednesday: [
          { start_time: "08:00", end_time: "12:00", date: "2025-05-13" },
          { start_time: "14:00", end_time: "18:00", date: "2025-05-13" },
        ],
        thursday: [
          { start_time: "08:00", end_time: "12:00", date: "2025-05-13" },
          { start_time: "14:00", end_time: "18:00", date: "2025-05-13" },
        ],
        friday: [
          { start_time: "08:00", end_time: "12:00", date: "2025-05-13" },
          { start_time: "14:00", end_time: "18:00", date: "2025-05-13" },
        ],
        saturday: [
          { start_time: "08:00", end_time: "12:00", date: "2025-05-13" },
          { start_time: "14:00", end_time: "18:00", date: "2025-05-13" },
        ],
        sunday: [
          { start_time: "08:00", end_time: "12:00", date: "2025-05-13" },
          { start_time: "14:00", end_time: "18:00", date: "2025-05-13" },
        ],
      };

      setSchedule(sampleData);

      // Uncomment for actual API call
      /*
      const response = await axios.get(`https://your-api-url/recommend/schedule/view/${userId}/`);
      if (response.status === 200) {
        setSchedule(response.data.schedule);
      }
      */
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleAddTimeSlot = (day, slot) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...prev[day], slot],
    }));
  };

  const handleDeleteTimeSlot = (day, index) => {
    const updatedDaySlots = [...schedule[day]];
    updatedDaySlots.splice(index, 1);
    setSchedule((prev) => ({
      ...prev,
      [day]: updatedDaySlots,
    }));
  };

  const handleEditTimeSlot = (day, index, slot) => {
    const updatedDaySlots = [...schedule[day]];
    updatedDaySlots[index] = slot;
    setSchedule((prev) => ({
      ...prev,
      [day]: updatedDaySlots,
    }));
  };

  const saveSchedule = async () => {
    try {
      // For demonstration, just show success message
      alert("Schedule saved successfully!");

      // Uncomment for actual API call
      /*
      const response = await axios.post('https://your-api-url/recommend/schedule/create/', {
        user: userId,
        schedule,
      });
      if (response.status === 201) {
        alert('Schedule saved successfully!');
      }
      */
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  const openModal = (day, slotIndex = null) => {
    setCurrentDay(day);
    if (slotIndex !== null) {
      setEditingSlot({ index: slotIndex, ...schedule[day][slotIndex] });
      
    } else {
      setEditingSlot(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentDay("");
    setEditingSlot(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-3 md:mb-0">
              <div className="bg-blue-600 p-2 rounded-full mr-3">
                <AiOutlineCalendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-medium text-gray-800">
                  Hospital Weekly Schedule
                </h1>
                <p className="text-xs text-gray-500">
                  Manage your hospital's availability
                </p>
              </div>
            </div>
            <button
              onClick={saveSchedule}
              className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition duration-200 flex items-center shadow-sm"
            >
              Save Schedule
            </button>
          </div>
        </div>

        {/* Schedule Column View */}
        <div className="flex flex-col space-y-4">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="bg-white border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="border-b px-4 py-2">
                <h3 className="text-sm font-medium text-gray-600">
                  {formatDay(day)}
                </h3>
              </div>

              <div className="p-3">
                {schedule[day].length > 0 ? (
                  <ul className="space-y-2">
                    {schedule[day].map((slot, idx) => (
                      <li
                        key={idx}
                        className="border border-gray-200 rounded-md p-2 hover:shadow-sm transition duration-200"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-blue-600 text-sm">
                              {formatTime(slot.start_time)} -{" "}
                              {formatTime(slot.end_time)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(slot.date)}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <AiOutlineEdit
                              className=" text-blue-600 hover:text-blue-800 size-5"
                              onClick={() => openModal(day, idx)}
                            />

                            <AiOutlineDelete
                              className=" text-red-500
                              hover:text-red-700 size-5"
                              
                              
                              onClick={() => handleDeleteTimeSlot(day, idx)}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-2 text-center">
                    <p className="text-gray-400 text-xs">No time slots</p>
                  </div>
                )}

                <button
                  onClick={() => openModal(day)}
                  className="w-full mt-3 bg-white border border-gray-300 text-blue-600 px-2 py-1 rounded-md hover:bg-gray-50 text-xs transition flex items-center justify-center"
                >
                  <AiOutlinePlus className="mr-1 h-3 w-3" />
                  Add Time Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={closeModal}>
        <DialogContent className="bg-white rounded-lg shadow-xl max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-600">
              {editingSlot ? "Edit" : "Add"} Time Slot - {formatDay(currentDay)}
            </DialogTitle>
          </DialogHeader>
          <TimeSlotModal
            day={currentDay}
            initialData={editingSlot}
            onSave={(slot) => {
              if (editingSlot) {
                handleEditTimeSlot(currentDay, editingSlot.index, slot);
              } else {
                handleAddTimeSlot(currentDay, slot);
              }
              closeModal();
            }}
            onCancel={closeModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalSchedule;
