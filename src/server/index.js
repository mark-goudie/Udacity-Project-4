const dotenv = require("dotenv");
dotenv.config();
const key = process.env.API_KEY;

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("dist/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/clientInput", async (req, res) => {
  const clientUrl = req.body.url;
  const urlOutput = await fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=${key}&url=${clientURL}&lang=en`
  );
  try {
    const data = await urlOutput.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});
