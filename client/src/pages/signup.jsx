import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const AddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://basicauth-ogg3.onrender.com/signup",
        {
          username,
          password,
        }
      );
      if (response.data === "success") {
        navigate("/login", { state: { message: "sign up success !" } });
      } else {
        console.log("error while entering new user");
      }
    } catch (err) {
      console.log("error while signing up : " + err);
    }
  };
  return (
    <div className="signupDiv">
      <h1>sign up page</h1>
      <form onSubmit={AddUser}>
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
