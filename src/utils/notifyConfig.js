import { Notify } from 'notiflix';

// Init Notify
Notify.init({
  position: 'center-top',
  distance: '10px',
  opacity: 0.95,
  borderRadius: '6px',
  timeout: 3500,
  fontSize: '1px', // May be ignored, so we override below
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  cssAnimationDuration: 250,
  cssAnimationStyle: 'fade',
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

// Full forced override
const style = document.createElement('style');
style.innerHTML = `
  .notiflix-notify,
  .notiflix-notify-content,
  .notiflix-notify__message {
    font-size: 0.5px !important;
    line-height: 1 !important;
    padding: 1px 2px !important;
    margin: 0 !important;
  }

  .notiflix-notify__icon {
    transform: scale(0.3) !important;
    margin-right: 1px !important;
  }
`;

document.head.appendChild(style);


export default Notify;
