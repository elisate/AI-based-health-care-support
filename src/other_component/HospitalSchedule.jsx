import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [editingSlot, setEditingSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const hospitalId = userToken?.user?.hospital_id;
  const key = userToken?.token;
  // console.log("===================",hospitalId)

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/recommend/schedule/get/${hospitalId}/`
      );
      if (response.status === 200) {
        setSchedule(response.data.schedule);
        
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    if (hospitalId) {
      fetchSchedule();
    }
  }, [hospitalId]);

  const isDuplicateSlot = (day, newSlot, index = null) => {
    return schedule[day].some((slot, i) => {
      return (
        i !== index &&
        slot.start_time === newSlot.start_time &&
        slot.end_time === newSlot.end_time &&
        slot.date === newSlot.date
      );
    });
  };

  const handleAddTimeSlot = (day, slot) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...prev[day], slot],
    }));
  };

  const handleDeleteTimeSlot = async (day, index) => {
    if (!window.confirm("Are you sure you want to delete this time slot?")) return;

    try {
      const response = await axios.delete(
        "http://127.0.0.1:8000/recommend/schedule/delete_slot",
        {
          data: {
            hospital_id: hospitalId,
            day: day,
            index: index,
          },
        }
      );

      if (response.status === 200) {
        setSchedule((prev) => {
          const updatedDaySlots = prev[day].filter((_, i) => i !== index);
          return {
            ...prev,
            [day]: updatedDaySlots,
          };
        });
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      alert("Failed to delete time slot.");
    }
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
  setLoading(true);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/recommend/schedule/create",
      {
        hospital_id: hospitalId,
        ...schedule, // 👈 Spread the schedule fields here
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      alert("Schedule saved successfully!");
      await fetchSchedule(); // Refresh updated data
    } else {
      alert("Unexpected response while saving schedule.");
    }
  } catch (error) {
    console.error("Error saving schedule:", error);
    alert("Failed to save schedule.");
  } finally {
    setLoading(false);
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
              disabled={loading}
              className={`bg-blue-600 text-white px-4 py-2 text-sm rounded-md flex items-center shadow-sm transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Save Schedule"}
            </button>
          </div>
        </div>

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
                              {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(slot.date)}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <AiOutlineEdit
                              className=" text-blue-600 hover:text-blue-800 size-5 cursor-pointer"
                              onClick={() => openModal(day, idx)}
                            />
                            <AiOutlineDelete
                              className="text-red-500 hover:text-red-700 size-5 cursor-pointer"
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
                if (isDuplicateSlot(currentDay, slot, editingSlot.index)) {
                  alert("This time slot already exists.");
                  return;
                }
                handleEditTimeSlot(currentDay, editingSlot.index, slot);
              } else {
                if (isDuplicateSlot(currentDay, slot)) {
                  alert("This time slot already exists.");
                  return;
                }
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
