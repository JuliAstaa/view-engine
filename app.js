const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "buku",
});

connection.connect();

const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Main menu",
    layout: "layout/main-layout",
  });
});

app.get("/data-buku", (req, res) => {
  connection.query("SELECT * FROM buku", (err, results, fields) => {
    if (err) throw err;
    res.render("pages/data-buku", {
      title: "data-buku",
      layout: "layout/main-layout",
      data: results,
    });
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`listening at port http://localhost:${port}`);
});
