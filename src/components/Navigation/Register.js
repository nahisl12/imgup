import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../Helpers/Requests";

const Register = ({ setMessage }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const onUsernameChange = (event) => setUsername(event.target.value);
  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmitRegister = async (event) => {
    event.preventDefault();

    if (username.length >= 3 && password.length > 7) {
      try {
        const data = await register(username, email, password, navigate);

        if (data._id) {
          navigate("/login");
        }
      } catch (error) {
        setMessage("An error occured while registering");
      }
    } else {
      setMessage("Usernames must be at least 3 characters long and Passwords must be at least 7 characters");
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
            autoComplete="username"
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
            autoComplete="new-password"
            required
            onChange={onPasswordChange}
          />
        </div>

        <button type="submit" className="button-blue" id="button-login" onClick={onSubmitRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
