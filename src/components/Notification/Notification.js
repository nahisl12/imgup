import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, setMessage }) => {
  useEffect(() => {
    errorMessage();

    return () => clearTimeout(errorMessage);
    // eslint-disable-next-line
  }, []);

  const errorMessage = () => {
    // sets the error message to an empty string after displaying for 5 seconds
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div className="message-container">
      <h3>{message}</h3>
    </div>
  );
};

export default Notification;
