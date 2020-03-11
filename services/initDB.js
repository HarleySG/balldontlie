// ------------------------- API
const API = require("../API");
// ------------------------- COMMAND
const writeDB = require("./writeFile");
// ------------------------- VALIDATE LOCAL DATA
module.exports = () => {
  const DATADB = API.get.local();
  if (DATADB.length > 0) {
  } else {
    return API.get
      .API("players")
      .then(res => {
        return res.data;
      })
      .then(async data => {
        const allPlayers = data.length ? data : [];
        const isSaved = await writeDB(allPlayers);
      });
  }
};
