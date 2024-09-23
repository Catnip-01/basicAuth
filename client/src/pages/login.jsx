import React, { useState } from "react";
import axios from "axios";
import Welcome from "./welcome";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [item, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const signupMessage = location.state.message;
  console.log("sign up message : " + JSON.stringify(signupMessage));

  const CheckPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log("response in jsx file is : " + JSON.stringify(response.data));
      if (response.data === "success") {
        // console.log("entered now");
        navigate("/welcome", { state: { name: username } });
      } else {
        console.log("wrong username / password entered !");
        setMessage("wrong username / password entered !");
      }
    } catch (err) {
      console.log("error while logging in : " + err);
    }
  };

  return (
    <div className="loginDiv">
      <h1>{signupMessage ? signupMessage : "Login page : "}</h1>
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
