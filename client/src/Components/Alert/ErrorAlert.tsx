import React, { useEffect, useState } from "react";

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

const ErrorAlert = ({ message, onClose }: ErrorAlertProps): JSX.Element => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
    }

    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer); 
  }, [message, onClose]);

  if (!show) return null;

  return (
    <div
      className="
        fixed top-4 left-1/2 transform -translate-x-1/2
        bg-red-100 text-red-700 border border-red-300
        rounded-lg px-6 py-4 text-lg
        shadow-lg z-50 opacity-100 transition-opacity duration-300
      "
    >
      {message}
    </div>
  );
};

export default ErrorAlert;
