const profile = require("../models/profile");
const express = require("express");
const app = express();

/* GET request. */
app.get("/profile/:userId", function (req, res) {
  res.json(req.params);
});

/* POST request. */
app.post("/profile/:userId"), function (req, res) {
    console.log(req.body);
    res.send(req.body);
  };

/* PUT request. */
app.put("/profile?age=22"), function (req, res) {
    var queryparameter = req.query;
    console.log(queryparameter.age);
    res.send(queryparameter);
  };
