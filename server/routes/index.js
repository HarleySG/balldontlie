const express = require("express");
const app = express();
// ------------------------- API
const API = require("./../../API");
/**
 * MIDDELWARES
 */
app.use(express.static("public"));
app.set("view engine", "pug");
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
  res.render("index", {
    title: "New - player",
    message: "Create new player!",
    menu: [
      { link: "/", text: "Home" },
      { link: "/players", text: "Players" },
      { link: "/new", text: "Create", active: "is-active" }
    ]
  });
});
app.listen(PORT, () => {
  console.log(` Puerto ${PORT} escuchando... `);
});
module.exports = app;
