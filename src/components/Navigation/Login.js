import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../Helpers/Requests";

const Login = ({ setUser, setMessage }) => {
  const [loginUsername, setLoginUsername] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const navigate = useNavigate();

  const onUsernameChange = (event) => setLoginUsername(event.target.value);
  const onPasswordChange = (event) => setLoginPassword(event.target.value);

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await logIn(loginUsername, loginPassword);

      // if a token is sent back after the request set the user and redirect
      if (data.accessToken) {
        setUser(data);
        navigate("/");
      } else {
        setMessage("an error occured while logging in");
      }
    } catch (error) {
      setMessage("Invalid Username/Password entered");
    }
  };

  return (
    <div className="login-container">
      <form className="form-container">
        <h1>Login</h1>

        <div className="login-username">
          <div className="input-label">
            <label htmlFor="username">Username</label>
          </div>
          <input
            className="input-box"
            type="username"
            name="username"
            id="username"
            placeholder="Enter your Username"
            required
            autoComplete="username"
            onChange={onUsernameChange}
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
            placeholder="Enter your Password"
            required
            autoComplete="current-password"
            onChange={onPasswordChange}
          />
        </div>

        <button className="button-blue" id="button-login" type="submit" onClick={onSubmitLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
