import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const onUsernameChange = (event) => setUsername(event.target.value);
  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmitRegister = async (event) => {
    event.preventDefault();

    try {
      const register = await fetch("http://localhost:3000/api/users", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const response = await register.json();

      if (response._id) {
        console.log("User sucessfully created");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <div className="registerUsername">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your Username"
            onChange={onUsernameChange}
          />
        </div>

        <div className="registerEmail">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            onChange={onEmailChange}
          />
        </div>

        <div className="registerPassword">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Set a Password"
            onChange={onPasswordChange}
          />
        </div>

        <button type="submit" onClick={onSubmitRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
