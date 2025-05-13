import React, { useState, useEffect } from "react";

const CurrentCreateSlotModal = ({ day, initialData, onSave, onCancel }) => {
  const [startTime, setStartTime] = useState(initialData?.start_time || "");
  const [endTime, setEndTime] = useState(initialData?.end_time || "");
  const [date, setDate] = useState(initialData?.date || "");

  useEffect(() => {
    if (initialData) {
      setStartTime(initialData.start_time);
      setEndTime(initialData.end_time);
      setDate(initialData.date);
    } else {
      // Reset the form for adding new slots
      setStartTime("");
      setEndTime("");
      setDate("");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (startTime && endTime && date) {
      const newSlot = { start_time: startTime, end_time: endTime, date };
      onSave(newSlot);
    } else {
      alert("All fields are required.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Add/Edit Time Slot for {day}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="text-gray-500 px-4 py-2 rounded-md hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentCreateSlotModal;
