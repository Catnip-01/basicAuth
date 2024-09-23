const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Postgres pool setup
const db = new Pool({
  user: "postgres", // Replace with your Postgres credentials
  host: "localhost",
  database: "postgres",
  password: "root", // Replace with your Postgres password
  port: 5432,
});

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  try {
    const result = db.query(
      "insert into users(username, password) values ($1, $2)",
      [req.body.username, req.body.password]
    );
  } catch (err) {
    console.log("you have error while entering to database : " + err);
  }
  res.send("success");
});

app.post("/login", async (req, res) => {
  console.log("this is your body : " + JSON.stringify(req.body));
  const result = await db.query("select * from users where username = ($1)", [
    req.body.username,
  ]);
  const item = result.rows;
  // console.log("items in result are : " + JSON.stringify(item));
  try {
    if (item.length > 0) {
      console.log("item password : " + item[0].password);
      console.log("body password : " + req.body.password);
      if (item[0].password == req.body.password) {
        console.log("entered here");
        res.send("success");
      } else {
        res.send("you entered wrong password !");
      }
    } else {
      res.send("item does not exist !");
    }
    console.log("this is the response : " + JSON.stringify(result.rows.length));
  } catch (err) {
    console.log("error : " + err);
  }
});

// Listen on port 5000
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
