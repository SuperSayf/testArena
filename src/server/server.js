const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Route to get users
app.get("/api/get/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.send(result);
  });
});

//Route to get registration details and insert
app.post("/api/post/register", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (user_firstname, user_surname, user_nickname, user_password, user_email, user_admin) VALUES (?,?,?,?,?,?)",
    [name, surname, username, password, email, 0],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

//Route to check Login Details
app.post("/api/post/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT EXISTS (SELECT * from users WHERE user_nickname = ? AND user_password = ?);",
    [username, password],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to get competitions
app.get("/api/get/competitions", (req, res) => {
  db.query("SELECT * FROM competition_details", (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.send(result);
  });
});

//Type above this
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
