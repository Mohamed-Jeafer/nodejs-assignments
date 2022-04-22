const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const weatherRoutes = require("./routes/weather");
const { mongoConnect } = require("./helpers/mongodb");

const app = express();
mongoConnect();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.redirect("/weather");
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
