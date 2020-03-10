const express = require("express");
const app = express();
/**
 * MIDDELWARES
 */
app.use(express.static(__dirname + "/public"));
app.set("view engine", "pug");
// ------------------------- COMMAND
const writeDB = require("./../../commands");
// ------------------------- PORT
const PORT = process.env.PORT;
// ------------------------- ROUTES
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
app.listen(PORT, () => {
  console.log(` Puerto ${PORT} escuchando... `);
});
module.exports = app;
