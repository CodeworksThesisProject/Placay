import React, { useEffect, useState } from "react";

interface SuccessAlertProps {
  message: string;
  onClose: () => void;
}

const SuccessAlert = ({ message, onClose }: SuccessAlertProps): JSX.Element => {
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
        bg-green-100 text-green-700 border border-green-300
        rounded-lg px-6 py-4 text-lg
        shadow-lg z-50 opacity-100 transition-opacity duration-300
      "
    >
      {message}
    </div>
  );
};

export default SuccessAlert;
