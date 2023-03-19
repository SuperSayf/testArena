const mysql = require("mysql");

require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.REACT_APP_API_KEY_DB_HOST,
  user: process.env.REACT_APP_API_KEY_DB_USER,
  password: process.env.REACT_APP_API_KEY_DB_PASSWORD,
  database: process.env.REACT_APP_API_KEY_DB_DATABASE,
  ssl: {},
});

db.connect((err) => {
  if (err) {
    console.log(
      "Error connecting to database, please check your credentials - warning by sayf"
    );
    console.log("stopping server");
    // Stop the server
    process.exit(1);
  } else {
    console.log("Connected to database");
  }
});

module.exports = db;
