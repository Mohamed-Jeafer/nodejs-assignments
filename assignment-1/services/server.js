const axios = require("axios");

const fetchServer = async (server) => {
  try {
    const response = await axios.get(server,{},{ timeout: 5000 });
    if (response.status >= 200 && response.status < 300) {
      return server;
    } else {
      throw new Error ('Server status is in 300')
    }
  } catch (error) {
    console.log(
      `Server is not found: \n Error Code: ${error.code} \n Host: ${error.hostname}`
    );
  }
};



module.exports = fetchServer;
