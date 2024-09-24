const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Updated to remove trailing slash
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://shantanu:iamShantanu%4003@catnip.jdygqyz.mongodb.net/?retryWrites=true&w=majority&appName=catnip",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Signup Route
app.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body); // Debugging log
  try {
    const user = new User(req.body);
    await user.save();
    console.log("User signed up successfully:", user); // Debugging log
    res.send("success");
  } catch (err) {
    console.error("Error during signup:", err); // Debugging log
    res.status(500).send("error");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  console.log("Login request received:", req.body); // Debugging log
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      console.log("User found:", user); // Debugging log
      if (user.password === req.body.password) {
        res.send("success");
      } else {
        console.log("Incorrect password for user:", user.username); // Debugging log
        res.send("you entered wrong password!");
      }
    } else {
      console.log("User not found for username:", req.body.username); // Debugging log
      res.send("item does not exist!");
    }
  } catch (err) {
    console.error("Error during login:", err); // Debugging log
    res.status(500).send("Error logging in");
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
