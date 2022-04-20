const lowestPrioritySort = (serverList) => {
  if (serverList && serverList.length >= 1) {
    let lowestPriority = serverList[0];
    for (let server of serverList) {
      if (lowestPriority.priority < server.priority) {
        lowestPriority = server;
      }
    }
    console.log("lowest priority", lowestPriority);
  }
  console.log("server list", serverList);
};

module.exports = {
  lowestPrioritySort,
};
