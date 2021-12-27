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
      const register = await fetch("http://localhost:3001/api/users", {
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
    <div className="login-container">
      <form className="form-container">
        <h1>Register</h1>

        <div className="login-username">
          <div className="input-label">
            <label htmlFor="username">Username</label>
          </div>
          <input
            className="input-box"
            type="text"
            id="username"
            placeholder="Enter your Username"
            required
            onChange={onUsernameChange}
          />
        </div>

        <div className="login-username">
          <div className="input-label">
            <label htmlFor="email">Email</label>
          </div>
          <input
            className="input-box"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            required
            onChange={onEmailChange}
          />
        </div>

        <div className="login-password">
          <div className="input-label">
            <label htmlFor="password">Password</label>
          </div>
          <input
            className="input-box"
            type="password"
            name="password"
            id="password"
            placeholder="Set a Password"
            required
            onChange={onPasswordChange}
          />
        </div>

        <button
          type="submit"
          className="button-blue"
          id="button-login"
          onClick={onSubmitRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
