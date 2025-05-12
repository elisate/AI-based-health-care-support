import React, { useState } from "react";
import { Input } from "../other_component/Input"; // Updated path
import { Button } from "../other_component/Button"; // Updated path
import { IoMdClose } from "react-icons/io";

const TimeSlotModal = ({ day, onSave, onCancel }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (startTime && endTime && date) {
      onSave({
        day,
        start_time: startTime,
        end_time: endTime,
        date,
      });
    }
  };

  return (
    <form>
      <div className="flex flex-row ml-80 -mt-7">
        <IoMdClose
          className="size-5 text-red-500 cursor-pointer"
          onClick={onCancel}
        />
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
