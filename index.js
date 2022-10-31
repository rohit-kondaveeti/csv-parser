const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const Csv = require("./models/csv");
const app = express();
const os = require("os");
const multer = require("multer");
const upload = multer({ dest: os.tmpdir() });
const fs = require("fs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

const Fs = require("fs");

app.get("/", function (req, res) {
  Csv.find({}, function (err, csv) {
    if (err) {
      console.log("error in fetching");
      return;
    }
    console.log(csv);
    return res.render("home", {
      title: "CSV Reader",
      row: csv,
    });
  });
});

app.get("/csv-data/:id", function (req, res) {
  Csv.findById(req.params.id, function (err, csv) {
    if (err) {
      console.log("error in fetching");
      return;
    }
    console.log(csv);
    return res.render("Csv-Data", {
      title: "CSV Reader",
      data: csv,
    });
  });
});

app.post("/csv", function (req, res) {
  console.log("req", req.body);
  Csv.create(
    {
      name: req.body.name,
      csv: req.body.csv,
    },
    function (err, newCsv) {
      if (err) {
        console.log("error in log!", err);
        return;
      }
      console.log("*****", newCsv);
      return res.redirect("back");
    }
  );
});
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("server is running");
});
