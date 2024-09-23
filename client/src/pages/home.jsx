import React, { useState } from "react";
import axios from "axios";
import Login from "./login";
import Navbar from "./navbar";

function Form() {
  //   const [input1, setInput1] = useState("");
  //   const [input2, setInput2] = useState("");

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post("http://localhost:5000/submit", {
  //         input1,
  //         input2,
  //       });
  //       console.log("Response:", response.data);
  //     } catch (err) {
  //       console.error("Error submitting form:", err);
  //     }
  //   };

  return <Navbar />;
}

export default Form;
