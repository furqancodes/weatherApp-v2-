const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const getWeather = require("./utils/getWeather");
//app express
const app = express();
const port = process.env.PORT || 3000;
//define paths for express config
const staticDirectoryPath = path.join(__dirname, "../public");
const newViews = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setting up static directory
app.use(express.static(staticDirectoryPath));
//setting up handle bars and views
app.set("view engine", "hbs");
app.set("views", newViews);
hbs.registerPartials(partialsPath);
//
//---------routes
//
app.get("/", (req, res) => {
  res.render("index", {
    text: "Search the weather here",
    title: "WeatherApp",
    name: "furqan",
  });
});
app.get("/Contact", (req, res) => {
  res.render("Contact", {
    text: "Need Help?",
    title: "Help",
    name: "furqan",
  });
});
app.get("/Contact/*", (req, res) => {
  res.render("error", { error: "💩" });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "furqan",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ ERROR: "address isnt provided" });
  }
  geoCode(req.query.address, (err, { longitude, latitude } = {}) => {
    err
      ? res.send({ error: err })
      : getWeather(longitude, latitude, (err, weather) => {
          err
            ? res.send({ error: err })
            : res.send({
                forecast: `Weather at ${req.query.address} ${weather} `,
              });
        });
  });
});
app.get("*", (req, res) => {
  res.render("error", { error: "Error 404 😢" });
});
//
//-------listener
//
app.listen(port, () => {
  console.log("server is up port " + port);
});
