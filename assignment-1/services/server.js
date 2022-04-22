const axios = require("axios");

const fetchServer = async (server) => {
  try {
    const response = await axios.get(server, {}, { timeout: 5000 });
    if (!isValidResponse(response.status)) {
      throw new Error("Server status is in range");
    }
    return server;
  } catch (error) {
    const err = (`${error.code} \n Host: ${error.hostname}`);
    console.log(err)
  }
};

const isValidResponse = (status) => {
  if (status >= 200 && status < 300) {
    return true;
  }
  return false;
};

module.exports = fetchServer;
