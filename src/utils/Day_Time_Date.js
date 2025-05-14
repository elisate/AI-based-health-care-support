// utils/Day_Time_Date.js

/**
 * Format time from "HH:mm" (24-hour) to "h:mm AM/PM"
 * Example: "14:30" -> "2:30 PM"
 */
export const formatTime = (timeStr) => {
  if (!timeStr || !timeStr.includes(":")) return "";
  const [hour, minute] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Format date from "YYYY-MM-DD" to "Month Day, Year"
 * Example: "2025-05-12" -> "May 12, 2025"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return isNaN(date)
    ? ""
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

/**
 * Capitalize day of the week
 * Example: "monday" -> "Monday"
 */
export const formatDay = (day) => {
  return typeof day === "string" && day.length
    ? day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()
    : "";
};
