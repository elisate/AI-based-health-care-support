// src/components/ui/Button.jsx

import React from 'react';

export const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-md ${className} hover:bg-blue-500 focus:outline-none`}
    >
      {children}
    </button>
  );
};
