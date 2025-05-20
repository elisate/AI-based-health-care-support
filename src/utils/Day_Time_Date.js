// utils/Day_Time_Date.js

/**
 * Format time from "HH:mm" (24-hour) to "h:mm AM/PM"
 * Example: "14:30" -> "2:30 PM"
 */
export const formatTime = (timeStr) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
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

/**
 * Get lowercase weekday (e.g. "monday") from a date string ("YYYY-MM-DD")
 */
export const getWeekdayFromDate = (dateStr) => {
  const date = new Date(dateStr);
  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return weekdays[date.getDay()];
};
