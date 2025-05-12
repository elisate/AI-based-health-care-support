// Format time from "HH:mm" to a more readable format (e.g., 14:30 -> 2:30 PM)
export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [hour, minute] = timeStr.split(':');
  const date = new Date();
  date.setHours(parseInt(hour), parseInt(minute));
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Format date from "YYYY-MM-DD" to readable format (e.g., 2025-05-12 -> May 12, 2025)
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Capitalize and return day (e.g., "monday" -> "Monday")
export const formatDay = (day) => {
  if (!day) return '';
  return day.charAt(0).toUpperCase() + day.slice(1);
};
