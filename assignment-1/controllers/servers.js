const fetchServer = require("../services/server");
const { lowestPrioritySort } = require("../util/server");
const serverList = require("../data/serversList.json");

const findServer = (req, res, next) => {
  const onlineServers = [];
  serverList.forEach(async (server) => {
    const url = await fetchServer(server.url);
    if (!url) {
      return;
    }
    onlineServers.push({ url, priority: server.priority });
  });
  const lowestPriority = lowestPrioritySort(onlineServers);
  return res.status(200).send(lowestPriority);
};

module.exports = findServer;
