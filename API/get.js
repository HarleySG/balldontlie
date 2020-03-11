const axios = require("axios");
module.exports = {
  API: ENDPOINT => {
    return axios.get(process.env.API + ENDPOINT).then(response => {
      return { status: response.status, data: response.data.data };
    });
  },
  local: () => require("../db/players.json")
};
