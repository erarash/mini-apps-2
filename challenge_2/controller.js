const axios = require("axios");

const get = (req, res) => {
  axios
    .get("https://api.coindesk.com/v1/bpi/historical/close.json")
    .then(data => {
      res.send(data.data);
    })
    .catch(err => console.error(err));
};

module.exports.get = get;
