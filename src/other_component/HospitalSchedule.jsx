import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../other_component/Dialog";
import {
  formatTime,
  formatDate,
  formatDay,
  getWeekdayFromDate,
} from "../utils/Day_Time_Date";
import { Trash2, Edit3, Plus, CalendarDays } from "lucide-react";
import Notify from "../utils/notifyConfig.js";

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
  const hospitalId = userToken?.role_data?.id;
  const key = userToken?.token;

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
    if (hospitalId) fetchSchedule();
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
        Notify.info("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      Notify.failure("Failed to delete time slot.");
    }
  };

  const handleEditTimeSlot = async ({ day, index, slot }) => {
    try {
      const updatedSlots = schedule[day].map((slt, i) => (i === index ? slot : slt));

      const response = await axios.put(
        "http://127.0.0.1:8000/recommend/schedule/update_day",
        {
          hospital_id: hospitalId,
          day,
          slots: updatedSlots,
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSchedule((prev) => {
          const updatedDaySlots = [...prev[day]];
          updatedDaySlots[index] = slot;
          return {
            ...prev,
            [day]: updatedDaySlots,
          };
        });
        Notify.success("Time slot updated successfully!");
      } else {
        Notify.failure("Failed to update time slot.");
      }
    } catch (error) {
      console.error("Error from API:", error?.response?.data || error.message);
      Notify.failure("Update failed. See console for details.");
    }
  };

  const saveSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/recommend/schedule/create",
        {
          hospital_id: hospitalId,
          ...schedule,
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Notify.success("Schedule saved successfully!");
        await fetchSchedule();
      } else {
        alert("Unexpected response while saving schedule.");
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
      Notify.failure("Failed to save schedule.");
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
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-blue-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-full shadow-sm">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Hospital Weekly Schedule
                </h1>
                <p className="text-sm text-gray-500">Manage hospital availability</p>
              </div>
            </div>
            <button
              onClick={saveSchedule}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white font-medium transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Save Schedule"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {daysOfWeek.map((day) => (
            <div key={day} className="bg-white rounded-lg border shadow-sm">
              <div className="px-4 py-2 border-b bg-gray-50">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {formatDay(day)}
                </h2>
              </div>
              <div className="p-4">
                {schedule[day].length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {schedule[day].map((slot, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2 hover:shadow"
                      >
                        <div>
                          <p className="text-sm text-blue-700 font-medium">
                            {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                          </p>
                          <p className="text-xs text-gray-500">{formatDate(slot.date)}</p>
                        </div>
                        <div className="flex gap-3">
                          <Edit3
                            className="text-blue-600 hover:text-blue-800 cursor-pointer w-5 h-5"
                            onClick={() => openModal(day, idx)}
                          />
                          <Trash2
                            className="text-red-500 hover:text-red-700 cursor-pointer w-5 h-5"
                            onClick={() => handleDeleteTimeSlot(day, idx)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-gray-400 text-sm">No time slots</div>
                )}
                <button
                  onClick={() => openModal(day)}
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 w-full border border-blue-200 py-2 rounded-md bg-white hover:bg-blue-50"
                >
                  <Plus className="w-4 h-4" />
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
            onSave={async (slot) => {
              const now = new Date();
              const selectedDateTime = new Date(`${slot.date}T${slot.start_time}`);
              if (selectedDateTime < now) {
                Notify.warning("Cannot add or update a time slot for a past date/time.");
                return;
              }
              const actualDay = getWeekdayFromDate(slot.date);
              if (actualDay !== currentDay.toLowerCase()) {
                Notify(`Date does not match the selected day (${formatDay(currentDay)}).`);
                return;
              }

              if (editingSlot) {
                if (isDuplicateSlot(currentDay, slot, editingSlot.index)) {
                  alert("This time slot already exists.");
                  return;
                }
                await handleEditTimeSlot({
                  day: currentDay,
                  index: editingSlot.index,
                  slot,
                });
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

// ✅ Fixed TimeSlotModal (no hospital_id included in slot data)
const TimeSlotModal = ({ day, initialData = {}, onSave, onCancel }) => {
  const [slotData, setSlotData] = useState({
    start_time: initialData.start_time || "",
    end_time: initialData.end_time || "",
    date: initialData.date || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlotData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { start_time, end_time, date } = slotData;
    if (!start_time || !end_time || !date) {
      Notify.warning("Please fill all fields.");
      return;
    }

    // ✅ Only send valid fields (not hospital_id)
    onSave({ start_time, end_time, date });
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-semibold text-gray-700">Start Time</label>
      <input
        type="time"
        name="start_time"
        value={slotData.start_time}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <label className="text-sm font-semibold text-gray-700">End Time</label>
      <input
        type="time"
        name="end_time"
        value={slotData.end_time}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <label className="text-sm font-semibold text-gray-700">Date</label>
      <input
        type="date"
        name="date"
        value={slotData.date}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default HospitalSchedule;
