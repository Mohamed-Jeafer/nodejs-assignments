const lowestPrioritySort = (serverList) => {
  if (serverList && serverList.length >= 1) {
    let lowestPriority = serverList[0];
    for (let server of serverList) {
      if (lowestPriority.priority < server.priority) {
        lowestPriority = server;
      }
    }
    return lowestPriority
  }
};

module.exports = {
  lowestPrioritySort,
};
