const express = require("express");
const https = require("https");
const app = express();
app.listen(3001, function () {
  console.log("app running on port 3001");
});
app.get("/", function (req, res) {
  const query = "Sri Lanka";
  const apikey = "838ff09b2e2762710a8513b183a16a60";
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
