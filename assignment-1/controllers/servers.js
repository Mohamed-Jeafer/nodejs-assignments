const fetchServer = require("../services/server");
const { lowestPrioritySort } = require("../util/server");
const serverList = require("../data/serversList.json");
const findServer = async (req, res, next) => {
  const onlineServers = [];
  try {
    serverList.forEach(async (server) => {
      const url = await fetchServer(server.url);
      if (!url) {
        return;
      }
      onlineServers.push({ url, priority: server.priority });
    });
  } catch (error) {
    console.log(error);
  }
  setTimeout(() => {
    const lowestPriority = lowestPrioritySort(onlineServers);
    return res.status(200).send(lowestPriority);
  }, 2000);
};

module.exports = findServer;
