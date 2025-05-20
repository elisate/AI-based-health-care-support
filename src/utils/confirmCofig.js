// utils/confirmConfig.js
import { Confirm } from 'notiflix';

Confirm.init({
  width: '350px',
  borderRadius: '8px',
  fontSize: '12px',
  backgroundColor: '#ffffff',
  zindex: 9999,
  cssAnimationDuration: 300,
  cssAnimationStyle: 'fade',

  titleColor: '#1e40af',            // Tailwind blue-900
  messageColor: '#374151',          // Tailwind gray-700

  okButtonBackground: '#3b82f6',    // Tailwind blue-500
  okButtonColor: '#ffffff',

  cancelButtonBackground: '#e5e7eb', // Tailwind gray-200
  cancelButtonColor: '#1f2937',      // Tailwind gray-800
});

export default Confirm;
