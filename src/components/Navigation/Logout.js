import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line
  }, [setUser]);

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <div>
      <h1>Logging out of account...</h1>
      {logoutUser()}
    </div>
  );
};

export default Logout;
