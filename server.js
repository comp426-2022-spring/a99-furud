const express = require("express");
const args = require("minimist")(process.argv.slice(0));
const app = express();
const fs = require("fs");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const get_data = require("./src/data.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./frontend"));

const db = require("./src/populate_db.js");

var port = args.port || 3000;

const server = app.listen(port, (req, res) => {
  console.log(`App listening on port ${port}`);
});

app.get("/covid_deaths/", (req, res) => {
  res.status(200).send("OK");
});

app.get("/db_populate.js", (req, res) => {
  res.status(200).send(db_populate.covid_deaths_db());
});

app.get("/update/:table", (req, res) => {
  if (req.params.table == "all") {
    res.status(200).send(db.update_database());
  } else {
    res.status(200).send(db.update_table(req.params.table));
  }
});

app.post("/get_data/", (req, res) => {
  res
    .status(200)
    .send(
      get_data.getData(
        req.body.name,
        (cols = req.body.cols),
        (paras = req.body.paras),
        req.body.order
      )
    );
});

app.use(function (req, res) {
  res.status(404).send("404 Page Not Found");
});
