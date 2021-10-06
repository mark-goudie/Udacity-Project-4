// Environment variables
const dotenv = require("dotenv");
dotenv.config();

// Global variables
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Language app listening on port 8081!");
});

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/clientInput", async (req, res) => {
  const apiURL = "https://api.meaningcloud.com/sentiment-2.1?";
  const api_key = process.env.API_KEY;
  const response = await fetch(
    `${apiURL}key=${api_key}&url=${req.body.formText}&lang=en`
  );
  try {
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log("Invalid response", error);
  }
});
