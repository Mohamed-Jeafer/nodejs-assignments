const axios = require("axios");
const fetchServer = async (server) => {
  try {
    const response = await axios.get(server,{},{ timeout: 5000 });
    if (response.status >= 200 && response.status < 300) {
      return server;
    }
  } catch (error) {
    console.log(
      `Server is not found: \n Error Code: ${error.code} \n Host: ${error.hostname}`
    );
    return null;
  }
};

module.exports = fetchServer;
