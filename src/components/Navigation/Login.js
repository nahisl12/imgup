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
      const submit = await fetch("http://localhost:3000/api/login", {
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
    <div>
      <h1>Login</h1>

      <form>
        <div className="loginUsername">
          <label htmlFor="email">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Enter your Username"
            onChange={onUsernameChange}
          />
        </div>

        <div className="loginPassword">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Set a Password"
            onChange={onPasswordChange}
          />
        </div>

        <button type="submit" onClick={onSubmitLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
