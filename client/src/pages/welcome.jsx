import React from "react";
import { useLocation } from "react-router-dom";

function Welcome() {
  const location = useLocation();
  const { name } = location.state || {};
  return (
    <div className="welcomeMessage">
      <h1
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "36px",
          color: "#4CAF50",
          textAlign: "center",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          margin: "20px auto",
          width: "fit-content",
        }}
      >
        Welcome to the page {name ? name : "Guest"}!
      </h1>
    </div>
  );
}

export default Welcome;
