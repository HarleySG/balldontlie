const axios = require("axios");

module.exports = ENDPOINT => {
  return axios.get(process.env.API + ENDPOINT).then(response => {
    return { status: response.status, data: response.data.data };
  });
};
