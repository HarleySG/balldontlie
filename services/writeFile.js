const fs = require("fs");
const file = __dirname + "/../db/players.json";

module.exports = async data => {
  return await fs.writeFile(file, JSON.stringify(data), err => {
    if (err) throw err;
    return { status: "success" };
  });
};
