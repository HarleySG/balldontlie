const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// ------------------------- API
const API = require("./../../API");
/**
 * MIDDELWARES
 */
app.use(express.static("public"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());
// ------------------------- PORT
const PORT = process.env.PORT;
// ------------------------- ROUTES
app.get("/players", (req, res) => {
  const db = API.get.local();
  res.render("players", {
    title: "all players",
    message: "all players!",
    menu: [
      { link: "/", text: "Home" },
      { link: "/players", text: "Players", active: "is-active" },
      { link: "/new", text: "Create" }
    ],
    success: true,
    players: db
  });
});
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home - express",
    message: "Hello there!",
    menu: [
      { link: "/", text: "Home", active: "is-active" },
      { link: "/players", text: "Players" },
      { link: "/new", text: "Create" }
    ]
  });
});
app.get("/new", (req, res) => {
  res.render("new", {
    title: "New - player",
    message: "Create new player!",
    menu: [
      { link: "/", text: "Home" },
      { link: "/players", text: "Players" },
      { link: "/new", text: "Create", active: "is-active" }
    ]
  });
});

app.post("/addPlayer", (req, res, next) => {
  const body = req.body;
  console.log("body", body);
  const modelPlayer = {
    id: 14,
    first_name: body.first_name,
    height_feet: body.height_feet == "" ? null : body.height_feet,
    height_inches: body.height_inches == "" ? null : body.height_inches,
    last_name: body.last_name,
    position: body.position,
    team: {
      id: body.team_id,
      abbreviation: body.abbreviation,
      city: body.city,
      conference: body.conference,
      division: body.division,
      full_name: body.full_name,
      name: body.name
    },
    weight_pounds: null
  };
  res.json({
    success: true,
    message: "User saved",
    data: modelPlayer
  });
});

app.listen(PORT, () => {
  console.log(` Puerto ${PORT} escuchando... `);
});
module.exports = app;
