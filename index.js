const API = require("./API");
// ------------------------- COMMAND
const writeDB = require("./commands");
require("./server");
const getPLAYERSDB = () => {
  try {
    const DATA = require("./db/players.json");
    return DATA;
  } catch (error) {
    return [];
  }
};

const DATADB = getPLAYERSDB();
if (DATADB.length > 0) {
} else {
  API.get
    .API("players")
    .then(res => {
      return res.data;
    })
    .then(async data => {
      const allPlayers = data.length ? data : [];
      const isSaved = await writeDB(allPlayers);
    });
}
