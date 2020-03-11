const axios = require("axios");
module.exports = {
  API: ENDPOINT => {
    return axios.get(process.env.API + ENDPOINT).then(response => {
      return { status: response.status, data: response.data.data };
    });
  },
  local: () => {
    try {
      const DATA = require("../db/players.json");
      return DATA;
    } catch (error) {
      return [];
    }
  }
};
