const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const emailjs = require("@emailjs/nodejs");
const mysql = require("mysql");
const axios = require("axios");
const { spawn } = require("child_process");
dotenv.config();

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

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

    // Execute functions after certain intervals
    // setInterval(checkActiveCompetitions, 10000);
  }
});

const checkActiveCompetitions = () => {
  // Every 10 seconds

  db.query(
    "SELECT competition_id, competition_enddate, competition_active FROM competition_details",
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      const currentDate = new Date();
      result.forEach((row) => {
        const endDate = new Date(row.competition_enddate);
        if (currentDate > endDate) {
          row.competition_active = false;
        } else {
          row.competition_active = true;
        }
        // Update the competition_active flag in the database
        db.query(
          "UPDATE competition_details SET competition_active = ? WHERE competition_id = ?",
          [row.competition_active, row.competition_id],
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
      });
      console.log(result);
    }
  );
};

// Route to calculate score
app.post("/api/get/upload/score", async (req, res) => {
  const textFileUrl = req.body.textFileUrl;
  console.log(textFileUrl);

  // const textFileUrl = "https://cdn.filestackcontent.com/N4r7m9lsSC2eI3fa9zCq";

  let text = "";

  try {
    const response = await axios.get(textFileUrl);
    if (typeof response.data === "string") {
      text = response.data.trim();
    } else {
      text = response.data.toString().trim();
    }
  } catch (error) {
    console.error(`Error fetching text file: ${error}`);
    res.status(500).send("Error fetching text file");
    return;
  }

  let markerScript = "";

  try {
    const markerScriptUrl =
      "https://cdn.filestackcontent.com/1EEAranQYGRtkAmLjB8Z"; // Replace with the URL of the marker script for compeition from DB
    const markerScriptResponse = await axios.get(markerScriptUrl);
    if (typeof markerScriptResponse.data === "string") {
      markerScript = markerScriptResponse.data.trim();
    } else {
      markerScript = markerScriptResponse.data.toString().trim();
    }
  } catch (error) {
    console.error(`Error fetching marker script: ${error}`);
    res.status(500).send("Error fetching marker script");
    return;
  }

  const pythonProcess = spawn("python", ["-c", markerScript], {
    stdio: ["pipe", "pipe", process.stderr],
  });

  pythonProcess.stdin.write(`${text}\n`); // Pass the text as input
  pythonProcess.stdin.end();

  let responseSent = false;

  pythonProcess.stdout &&
    pythonProcess.stdout.on("data", (data) => {
      console.log(`Received data from Python script: ${data}`);
      if (!responseSent) {
        res.send(`${data}`);
        responseSent = true;
      }
    });

  pythonProcess.stderr &&
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error executing Python script: ${data}`);
      if (!responseSent) {
        res.status(500).send("Error executing Python script");
        responseSent = true;
      }
    });
});

app.post("/api/get/uploadTest/score", async (req, res) => {
  const textFileUrl = req.body.textFileUrl;
  const competitionId = req.body.competitionId;
  console.log(textFileUrl);

  // const textFileUrl = "https://cdn.filestackcontent.com/N4r7m9lsSC2eI3fa9zCq";

  let text = "";

  try {
    const response = await axios.get(textFileUrl);
    if (typeof response.data === "string") {
      text = response.data.trim();
    } else {
      text = response.data.toString().trim();
    }
  } catch (error) {
    console.error(`Error fetching text file: ${error}`);
    res.status(500).send("Error fetching text file");
    return;
  }

  try {
    // Get competition_marker from the database using competitionId
    const getCompetitionDetails = (competitionId) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT competition_marker FROM competition_details WHERE competition_id = ?",
          [competitionId],
          (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result[0].competition_marker);
          }
        );
      });
    };

    const competitionDetails = await getCompetitionDetails(competitionId);
    console.log("Link: " + competitionDetails);

    const markerScriptUrl = competitionDetails;
    const markerScriptResponse = await axios.get(markerScriptUrl);
    let markerScript = "";
    if (typeof markerScriptResponse.data === "string") {
      markerScript = markerScriptResponse.data.trim();
    } else {
      markerScript = markerScriptResponse.data.toString().trim();
    }

    const pythonProcess = spawn("python", ["-c", markerScript], {
      stdio: ["pipe", "pipe", process.stderr],
    });

    pythonProcess.stdin.write(`${text}\n`); // Pass the text as input
    pythonProcess.stdin.end();

    let responseSent = false;

    pythonProcess.stdout &&
      pythonProcess.stdout.on("data", (data) => {
        console.log(`Received data from Python script: ${data}`);
        if (!responseSent) {
          res.send(`${data}`);
          responseSent = true;
        }
      });

    pythonProcess.stderr &&
      pythonProcess.stderr.on("data", (data) => {
        console.error(`Error executing Python script: ${data}`);
        if (!responseSent) {
          res.status(500).send("Error executing Python script");
          responseSent = true;
        }
      });
  } catch (error) {
    console.error(`Error fetching marker script: ${error}`);
    res.status(500).send("Error fetching marker script");
    return;
  }
});




//!Test route
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

//!Route to get registration details and insert
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

//Create a competition
app.post("/api/post/Create_comp", (req, res) => {
  const compname = req.body.compname;
  const pic = req.body.pic;
  const CombinedCompStart = req.body.CombinedCompStart;
  const CombinedCompEnd = req.body.CombinedCompEnd;
  const desc = req.body.desc;
  const pdf = req.body.pdf;
  const testcaseNum = req.body.testcaseNum;
  const testcases = req.body.testcases;
  const marker = req.body.marker;
  const CombinedRegStart = req.body.CombinedRegStart;
  const CombinedRegEnd = req.body.CombinedRegEnd;
  const numTeams = req.body.numTeams;
  const min = req.body.min;
  const max = req.body.max;

  db.query(
    "INSERT INTO competition_details (competition_name, competition_views, competition_image, competition_startdate, competition_enddate, competition_info, competition_testcases, competition_active, no_testcases, testcases,competition_marker, registration_startdate,registration_enddate, max_teams,teamsize_min,teamsize_max) VALUES (?, 0, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      compname,
      pic,
      CombinedCompStart,
      CombinedCompEnd,
      desc,
      pdf,
      testcaseNum,
      testcases,
      marker,
      CombinedRegStart,
      CombinedRegEnd,
      numTeams,
      min,
      max,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

//!Route to check Login Details
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

//Route to get competitions
app.get("/api/get/competitions", (req, res) => {
  db.query("SELECT * FROM competition_details", (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.send(result);
  });
});

// Route to add 1 to competition_views
app.post("/api/post/competition/incViews", (req, res) => {
  const competition_id = req.body.competition_id;

  db.query(
    "UPDATE competition_details SET competition_views = competition_views + 1 WHERE competition_id = ?",
    competition_id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

//! Route to get hashed password
app.get("/api/get/password/:username", (req, res) => {
  const username = req.params.username;
  db.query(
    "SELECT user_password FROM users WHERE user_nickname = ?",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Route to send email
app.post("/api/send/email", (req, res) => {
  const { name, subject, email, message } = req.body;

  emailjs
    .send(
      "service_c64xcqo",
      "template_d23i9to",
      {
        name: name,
        subject: subject,
        email: email,
        message: message,
      },
      {
        publicKey: process.env.REACT_APP_API_KEY_PUBLIC_EMAIL,
        privateKey: process.env.REACT_APP_API_KEY_PRIVATE_EMAIL,
      }
    )
    .then((result) => {
      res.status(200).send("Email sent successfully");
    })
    .catch((error) => {
      console.log(error.text);
      res.status(500).send("Error sending email");
    });
});

//!ROute to check if username already exists
app.get("/api/get/doesExist/:username", (req, res) => {
  const username = req.params.username;
  db.query(
    "SELECT * from users WHERE user_nickname = ?;",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//!Route to see if user admin
app.get("/api/get/isAdmin/:username", (req, res) => {
  const username = req.params.username;
  db.query(
    "SELECT user_admin from users WHERE user_nickname = ?",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
!(
  //! Route to create a team
  app.post("/api/post/create/team", (req, res) => {
    const user_id = req.body.user_id;
    const team_name = req.body.team_name;
    const team_code = req.body.team_code;
    const competition_id = req.body.competition_id;
    const team_location = req.body.team_location;
    db.query(
      "INSERT INTO team_details (user_id, team_name, team_code,team_captain, competition_id, team_score, team_location) VALUES (?, ?, ?, 1, ?, 0, ?);",
      [user_id, team_name, team_code, competition_id, team_location],
      (err, result) => {
        if (err) {
          res.send(err);
          console.log(err);
        }
        console.log(result);
      }
    );
  })
);

//!Route to check if the team name already exists
//* Returns [] if DNE, else returns something
app.get("/api/get/doesTeamExist/:team_name", (req, res) => {
  const team_name = req.params.team_name;
  db.query(
    "SELECT * from team_details WHERE team_name = ?;",
    team_name,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//!Route to check if the team_code exists
//* Returns [] if DNE, else returns something
app.get("/api/get/doesCodeExist/:team_code", (req, res) => {
  const team_code = req.params.team_code;
  db.query(
    "SELECT * from team_details WHERE team_code = ?;",
    team_code,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Team code can't be primary, cause if two users belong to same team , we have two entries with same code
//!Route to check which team the code belongs to
app.get("/api/get/codeBelongto/:team_code", (req, res) => {
  const team_code = req.params.team_code;
  db.query(
    "SELECT team_name from team_details WHERE team_code = ? LIMIT 1;",
    team_code,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//!Route to add user to a team
app.post("/api/post/addTo/team", (req, res) => {
  const user_id = req.body.user_id;
  const team_name = req.body.team_name;
  const team_code = req.body.team_code;
  const competition_id = req.body.competition_id;

  db.query(
    "INSERT INTO teams (user_id, team_name, team_code, competition_id) VALUES (?, ?, ?, ?);",
    [user_id, team_name, team_code, competition_id],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

//!Route to get user id related to username
app.get("/api/get/userID/:username", (req, res) => {
  const username = req.params.username;
  db.query(
    "SELECT user_id from users WHERE user_nickname = ?;",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//!Route to get userID, userEmail, userPassword related to username
app.get("/api/get/userDetails/:username", (req, res) => {
  const username = req.params.username;
  db.query(
    "SELECT user_id, user_password, user_email from users WHERE user_nickname = ?;",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//!Route to update user information
app.post("/api/post/updateDetails", (req, res) => {
  const userID = req.body.user_id;
  const email = req.body.user_email;
  const username = req.body.user_nickname;
  const password = req.body.user_password;

  db.query(
    "UPDATE users SET user_nickname = ?,  user_password = ?, user_email = ? WHERE user_id = ?;",
    [username, password, email, userID],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

//Route to get all teams
app.get("/api/get/teams", (req, res) => {
  db.query("SELECT * FROM team_details", (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.send(result);
  });
});
//Route to get all teams
app.get("/api/get/admin_teams", (req, res) => {
  db.query(
    "SELECT team_details.team_code, team_details.user_id,team_details.team_name, team_details.team_score, competition_details.competition_name FROM team_details INNER JOIN competition_details ON team_details.competition_id = competition_details.competition_id;",
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Route to get the competitionIid
app.get("/api/get/competitionID/:competition_name", (req, res) => {
  const competition_name = req.params.competition_name;
  db.query(
    "SELECT competition_id from competition_details WHERE competition_name = ?;",
    competition_name,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Route to see if the user is registered for the competition
app.get("/api/get/isRegistered/:competition_id/:user_id", (req, res) => {
  const competition_id = req.params.competition_id;
  const user_id = req.params.user_id;
  db.query(
    "SELECT * from team_details WHERE competition_id = ? AND user_id = ?;",
    [competition_id, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Route to get the competitionIid
app.get("/api/get/competitionIDGlobal/:competition_name", (req, res) => {
  const competition_name = req.params.competition_name;
  db.query(
    "SELECT competition_id from competition_details WHERE competition_name = ?;",
    competition_name,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get the all competitions a user is registered for
app.get("/api/get/competition/registered/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  db.query(
    "SELECT competition_id from teams WHERE user_id = ?;",
    user_id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to leave a team
app.post("/api/post/leave/team", (req, res) => {
  const user_id = req.body.user_id;
  const competition_id = req.body.competition_id;

  db.query(
    "DELETE FROM team_details WHERE user_id = ? AND competition_id = ?;",
    [user_id, competition_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

//!Route to get the competition title and description
app.get("/api/get/compDetails/:comp_id", (req, res) => {
  const comp_id = req.params.comp_id;
  db.query(
    "SELECT competition_name, competition_info from competition_details WHERE competition_id = ?;",
    comp_id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to update team table
app.post("/api/post/update/team", (req, res) => {
  const team_code = req.body.team_code;
  const user_id = req.body.user_id;
  const team_name = req.body.team_name;
  const team_score = req.body.team_score;

  db.query(
    "UPDATE team_details SET team_name = ?, team_score = ?, user_id = ? WHERE team_code = ?;",
    [team_name, team_score, user_id, team_code],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to remove/delete a team
app.post("/api/post/remove/team", (req, res) => {
  const user_id = req.body.user_id;
  const team_code = req.body.team_code;

  db.query(
    "DELETE FROM team_details WHERE user_id = ? AND team_code = ?;",
    [user_id, team_code],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to remove/delete a team
app.post("/api/post/remove/competition", (req, res) => {
  const comp_id = req.body.comp_id;

  db.query(
    "DELETE cd, td, t, s FROM competition_details cd LEFT JOIN team_details td ON cd.competition_id = td.competition_id LEFT JOIN teams t ON cd.competition_id = t.competition_id LEFT JOIN submissions s ON cd.competition_id = s.competition_id WHERE cd.competition_id = ?;",
    [comp_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

//!Route to get competition test cases
app.get("/api/get/compTestCases/:comp_id", (req, res) => {
  const comp_id = req.params.comp_id;
  db.query(
    "SELECT competition_testcases from competition_details WHERE competition_id = ?;",
    comp_id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Route to get the team_name in that competition
app.get("/api/get/team_name/:comp_id/:user_id", (req, res) => {
  const comp_id = req.params.comp_id;
  const user_id = req.params.user_id;
  db.query(
    "SELECT team_name from team_details WHERE competition_id = ? AND user_id = ?;",
    [comp_id, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Route to get latest test_case
app.get("/api/get/testcase_latest/:comp_id/:user_id", (req, res) => {
  const comp_id = req.params.comp_id;
  const user_id = req.params.user_id;
  db.query(
    "SELECT testcase_latest from team_details WHERE competition_id = ? AND user_id = ?;",
    [comp_id, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Route to get highest score
app.get("/api/get/testcase_highest/:comp_id/:user_id", (req, res) => {
  const comp_id = req.params.comp_id;
  const user_id = req.params.user_id;
  db.query(
    "SELECT testcase_highest from team_details WHERE competition_id = ? AND user_id = ?;",
    [comp_id, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Route to get submission history
app.get("/api/get/testcase_prev/:comp_id/:user_id", (req, res) => {
  const comp_id = req.params.comp_id;
  const user_id = req.params.user_id;
  db.query(
    "SELECT testcase_prev from team_details WHERE competition_id = ? AND user_id = ?;",
    [comp_id, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//! Route to get Number of testcases
app.get("/api/get/numTests/:comp_id", (req, res) => {
  const comp_id = req.params.comp_id;

  db.query(
    "SELECT no_testcases from competition_details WHERE competition_id = ?;",
    comp_id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//!Route to add latest
app.post("/api/post/latestScore/team", (req, res) => {
  const team_name = req.body.team_name;
  const testcase_latest = req.body.testcase_latest;
  db.query(
    "UPDATE team_details SET testcase_latest = ? WHERE team_name = ?;",
    [testcase_latest, team_name],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

//!Route to add testcase_prev
app.post("/api/post/testcasePrev/team", (req, res) => {
  const team_name = req.body.team_name;
  const testcase_prev = req.body.testcase_prev;
  db.query(
    "UPDATE team_details SET testcase_prev = ? WHERE team_name = ?;",
    [testcase_prev, team_name],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

//!Route to add highest
app.post("/api/post/highestScore/team", (req, res) => {
  const team_name = req.body.team_name;
  const testcase_highest = req.body.testcase_highest;
  db.query(
    "UPDATE team_details SET testcase_highest = ? WHERE team_name = ?;",
    [testcase_highest, team_name],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

//!Route to post the score
app.post("/api/post/submission", (req, res) => {
  const submission_score = req.body.submission_score;
  const submission_number = req.body.submission_number;
  const submission_link = req.body.submission_link;
  const competition_id = req.body.competition_id;
  const team_name = req.body.team_name;

  db.query(
    "INSERT INTO submissions (submission_score, submission_number, submission_link, competition_id, team_name) VALUES (?,?,?,?,?);",
    [
      submission_score,
      submission_number,
      submission_link,
      competition_id,
      team_name,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Get number of test cases in competition and team name
app.get("/api/get/compTeamDeatils/:comp_id/:user_id", (req, res) => {
  const comp_id = req.params.comp_id;
  const user_id = req.params.user_id;

  db.query(
    "SELECT cd.no_testcases, td.team_name FROM competition_details cd JOIN teams td ON cd.competition_id = td.competition_id WHERE cd.competition_id = ? AND td.competition_id = ? AND td.user_id = ?;",
    [comp_id, comp_id, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Get all info for leaderboard
app.get("/api/get/leaderboard/:comp_id", (req, res) => {
  const comp_id = req.params.comp_id;
  db.query(
    `SELECT team_name, team_score, team_location, testcase_highest
  FROM team_details WHERE competition_id = ? ORDER BY team_score DESC;`,
    [comp_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Get number of test cases in competition
app.get("/api/get/numTests/:comp_id", (req, res) => {
  const comp_id = req.params.comp_id;

  db.query(
    "SELECT no_testcases FROM competition_details WHERE competition_id = ?;",
    comp_id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Get test cases in competition
app.get("/api/get/Testcases/:comp_id", (req, res) => {
  const comp_id = req.params.comp_id;

  db.query(
    "SELECT testcases FROM competition_details WHERE competition_id = ?;",
    comp_id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Initialise testcase latest and highest fields
app.post("/api/post/initTests/team", (req, res) => {
  const team_name = req.body.team_name;
  const testcase_latest = req.body.testcase_latest;
  const testcase_highest = req.body.testcase_highest;

  db.query(
    "UPDATE team_details SET testcase_latest = ?, testcase_highest = ? WHERE team_name = ?;",
    [testcase_latest, testcase_highest, team_name],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to get the teamName
app.get("/api/get/teamName/:user_id/:competition_id", (req, res) => {
  const user_id = req.params.user_id;
  const competition_id = req.params.competition_id;

  db.query(
    "SELECT team_name FROM teams WHERE user_id = ? AND competition_id = ?;",
    [user_id, competition_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get all team members of a team
app.post("/api/get/teamMembers", (req, res) => {
  const user_id = req.query.user_id;
  const competition_id = req.query.competition_id;

  const sql = `
    SELECT t.user_id, 
           CASE WHEN td.team_captain IS NOT NULL THEN 1 ELSE 0 END AS is_captain
    FROM teams t
    LEFT JOIN team_details td ON t.team_code = td.team_code AND t.user_id = td.user_id
    WHERE t.team_code = (
      SELECT team_code
      FROM teams
      WHERE competition_id = ${competition_id} AND user_id = ${user_id}
      LIMIT 1
    )
  `;

  // Execute the query
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    } else {
      const response = result.map((row) => {
        return {
          user_id: row.user_id,
          is_captain: row.is_captain === 1 ? true : false,
        };
      });
      res.status(200).send(response);
    }
  });
});

// DO NOT TOUCH, THIS FOR SAYF
app.post("/api/get/admin/teamMembers", (req, res) => {
  const team_code = req.body.team_code;
  const user_id = req.body.user_id;

  const sql = `
    SELECT t.user_id, u.user_firstname, u.user_surname,
           CASE WHEN td.team_captain IS NOT NULL THEN 1 ELSE 0 END AS is_captain
    FROM teams t
    LEFT JOIN team_details td ON t.team_code = td.team_code AND t.user_id = td.user_id
    JOIN users u ON t.user_id = u.user_id
    WHERE t.team_code = '${team_code}'
  `;

  // Execute the query
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    } else {
      const response = result.map((row) => {
        return {
          user_id: row.user_id,
          user_firstname: row.user_firstname,
          user_surname: row.user_surname,
          is_captain: row.is_captain === 1 ? true : false,
        };
      });
      res.status(200).send(response);
    }
  });
});

// Route to get the username linked to user_id
app.get("/api/get/userNickname/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  db.query(
    "SELECT user_nickname FROM users WHERE user_id = ?;",
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get the team location
app.get("/api/get/teamLocation/:teamName/:competition_id", (req, res) => {
  const team_name = req.params.teamName;
  const competition_id = req.params.competition_id;

  db.query(
    "SELECT team_location FROM team_details WHERE team_name = ? AND competition_id = ?;",
    [team_name, competition_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get the team code
app.get("/api/get/teamCode/:teamName/:competition_id", (req, res) => {
  const team_name = req.params.teamName;
  const competition_id = req.params.competition_id;

  db.query(
    "SELECT team_code FROM team_details WHERE team_name = ? AND competition_id = ?;",
    [team_name, competition_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to remove team member
app.post("/api/post/remove/teamMember", (req, res) => {
  const user_id = req.body.user_id;
  const team_code = req.body.team_code;

  db.query(
    "DELETE FROM teams WHERE user_id = ? AND team_code = ?;",
    [user_id, team_code],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to change team captain
app.post("/api/post/change/teamCaptain", (req, res) => {
  const user_id = req.body.user_id;
  const team_code = req.body.team_code;

  db.query(
    "UPDATE team_details SET user_id = ? WHERE team_code = ?;",
    [user_id, team_code],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

//!Type above this
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
