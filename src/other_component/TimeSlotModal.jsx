import React, { useState, useEffect } from "react";
import { Input } from "../other_component/Input";
import { Button } from "../other_component/Button";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const TimeSlotModal = ({ day, initialData, onSave, onCancel }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  // If initialData is passed (editing mode), populate form with data
  useEffect(() => {
    console.log("Initial Data:", initialData); // Debug log
    if (initialData) {
      setStartTime(initialData.start_time);
      setEndTime(initialData.end_time);
      setDate(initialData.date);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Date:", date);

    if (startTime && endTime && date) {
      const slot = {
        day,
        start_time: startTime,
        end_time: endTime,
        date,
      };

      if (initialData) {
        // Editing an existing slot
        await updateSlot(slot);
      } else {
        // Adding a new slot
        onSave(slot);
        onCancel();
      }
    }
  };

 const updateSlot = async (slot) => {
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const hospitalId = userToken?.user?.hospital_id;

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/recommend/schedule/update_day",
      {
        hospital_id: hospitalId,
        day: day,
        index: initialData.index,
        slot: slot,
      }
    );
    if (response.status === 200) {
      alert("Time slot updated successfully!");
      onSave({ ...slot, index: initialData.index }); // ✅ Send index too
      onCancel();
    } else {
      alert("Failed to update time slot.");
    }
  } catch (error) {
    console.error("Error updating slot:", error);
    alert("Error updating time slot.");
  }
};

  return (
    <form>
      <div className="flex flex-row ml-80 -mt-7">
        <IoMdClose className="size-5 text-red-500" onClick={onCancel} />
      </div>
      <div className="flex flex-col gap-2">
        <div>Start Time</div>
        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Start Time"
        />
        <div>End Time</div>
        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="End Time"
        />
        <div>Date</div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
        />
      </div>
      <div className="flex justify-end pl-6">
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 text-sm text-white hover:bg-blue-700 w-16"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default TimeSlotModal;
