// src/components/ui/Input.jsx

import React from 'react';

export const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 border rounded-md w-full"
    />
  );
};
