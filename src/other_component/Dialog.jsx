// src/components/ui/Dialog.jsx

import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50" onClick={onOpenChange}>
      <div className="bg-white rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return <div className="px-4 py-2 border-b">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h3 className="text-xl font-semibold text-gray-800">{children}</h3>;
};
