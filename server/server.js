const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Postgres pool setup
mongoose
  .connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// In your signup route
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body); // Assuming you have a User model
    await user.save();
    res.send("success"); // Ensure this is sent on successful signup
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("error"); // Send an error response if there is an issue
  }
});

app.post("/login", async (req, res) => {
  console.log("this is your body: " + JSON.stringify(req.body));
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (user.password === req.body.password) {
        res.send("success");
      } else {
        res.send("you entered wrong password!");
      }
    } else {
      res.send("item does not exist!");
    }
  } catch (err) {
    console.log("error: " + err);
    res.status(500).send("Error logging in");
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
