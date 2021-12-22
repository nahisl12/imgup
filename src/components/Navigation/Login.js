import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [loginUsername, setLoginUsername] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const navigate = useNavigate();

  const onUsernameChange = (event) => setLoginUsername(event.target.value);
  const onPasswordChange = (event) => setLoginPassword(event.target.value);

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const submit = await fetch("http://localhost:3001/api/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const response = await submit.json();

      if (response.accessToken) {
        console.log(response);
        setUser(response);
        navigate("/");
      } else {
        console.log("error logging in");
      }
    } catch (error) {
      console.log(error);
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
            onChange={onPasswordChange}
          />
        </div>

        <button
          className="button-blue"
          id="button-login"
          type="submit"
          onClick={onSubmitLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
