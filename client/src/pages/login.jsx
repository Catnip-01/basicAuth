import React, { useState } from "react";
import axios from "axios";
import Welcome from "./welcome";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const signupMessage = location.state ? location.state.message : null; // Updated line

  const CheckPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://basicauth-ogg3.onrender.com/login",
        {
          username,
          password,
        }
      );
      if (response.data === "success") {
        navigate("/welcome", { state: { name: username } });
      } else {
        setMessage("wrong username / password entered !");
      }
    } catch (err) {
      console.log("error while logging in : " + err);
    }
  };

  return (
    <div className="loginDiv">
      <h1>{signupMessage ? signupMessage : "Login page : "}</h1>{" "}
      {/* This line is already correct */}
      <form onSubmit={CheckPassword}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default Login;
