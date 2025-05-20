import { Notify } from 'notiflix';

Notify.init({
  // no fixed width, so it auto sizes
  position: 'center-top',
  distance: '10px',
  opacity: 0.95,
  borderRadius: '6px',
  timeout: 3500,
  fontSize: '7px', // smaller font size
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  cssAnimationDuration: 250,
  cssAnimationStyle: 'fade',

  // Very high z-index to be on top
  zindex: 99999,

  success: {
    background: '#d4edda',
    textColor: '#155724',
    notiflixIconColor: '#155724',
  },
  failure: {
    background: '#f8d7da',
    textColor: '#721c24',
    notiflixIconColor: '#721c24',
  },
  warning: {
    background: '#fff3cd',
    textColor: '#856404',
    notiflixIconColor: '#856404',
  },
  info: {
    background: '#cce5ff',
    textColor: '#004085',
    notiflixIconColor: '#004085',
  },
});

// Add global CSS to style notification container
const style = document.createElement('style');
style.innerHTML = `
  .notiflix-notify {
    max-width: 22rem; /* about 352px */
    white-space: normal; /* allow multi-line */
    overflow-wrap: break-word;
  }
`;

document.head.appendChild(style);

export default Notify;
