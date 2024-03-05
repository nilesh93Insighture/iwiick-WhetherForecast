const express = require("express");
const https = require("https");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.listen(3001, function () {
  if (process.env.API_KEY) {
    console.log(`'API_KEY' loaded`);
  } else {
    console.log(`'API_KEY' is needed in the .env file`);
  }
  console.log("app running on port 3001");
});

app.get("/", function (req, res) {
  const query = "Sri Lanka";
  const apikey = process.env.API_KEY;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    unit;
  https.get(url, function (resp) {
    console.log(resp.statusCode);
    resp.on("data", function (data) {
      const wether = JSON.parse(data);
      res.send(wether);
    });
  });
});
