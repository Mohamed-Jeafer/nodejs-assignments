const fetchServer = require("../services/server");
const { lowestPrioritySort } = require("../util/server");
const serverList = require("../data/serversList.json");

const onlineServers = []
const findServer = async (req, res, next) => {
  try {
    serverList.forEach(async (server) => {
      const url = await fetchServer(server.url);
      if (!url) {
        return;
      }
      onlineServers.push({ url, priority: server.priority });
    });
    setTimeout(() => {
      const lowestPriority = lowestPrioritySort(onlineServers);
      return res.status(200).send(lowestPriority);
    }, 2000);
  } catch (error) {
    throw new Error ("All servers were not available")
  }
};

module.exports = findServer;
