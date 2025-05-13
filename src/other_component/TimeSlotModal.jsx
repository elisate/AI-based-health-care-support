import React, { useState, useEffect } from "react";
import { Input } from "../other_component/Input";
import { Button } from "../other_component/Button";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const TimeSlotModal = ({ day, initialData, onSave, onCancel }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setStartTime(initialData.start_time);
      setEndTime(initialData.end_time);
      setDate(initialData.date);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!startTime || !endTime || !date) {
      alert("Please fill all fields.");
      return;
    }

    const slot = {
      start_time: startTime,
      end_time: endTime,
      date,
    };

    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const hospitalId = userToken?.user?.hospital_id;

    if (initialData) {
      // Editing mode — perform PUT request
      try {
        const response = await axios.put("http://127.0.0.1:8000/recommend/schedule/update_day", {
          hospital_id: hospitalId,
          day,
          index: initialData.index,
          slot,
        });

        if (response.status === 200) {
          alert("Time slot updated successfully!");
          onSave({ ...slot, index: initialData.index });
          onCancel();
        } else {
          alert("Failed to update time slot.");
        }
      } catch (error) {
        console.error("Error updating slot:", error);
        alert("Error updating time slot.");
      }
    } else {
      // Adding new slot locally (no backend call)
      onSave(slot);
      onCancel();
    }
  };

  return (
    <form>
      <div className="flex flex-row ml-80 -mt-7">
        <IoMdClose className="size-5 text-red-500 cursor-pointer" onClick={onCancel} />
      </div>
      <div className="flex flex-col gap-2">
        <div>Start Time</div>
        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <div>End Time</div>
        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <div>Date</div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="flex justify-end pl-6 mt-4">
        <Button
          type="button"
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
