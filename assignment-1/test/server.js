const { expect } = require("chai");
const [serverList] = require("../data/serversList.json");
const findServer = require("../controllers/servers");
const fetchServer = require("../services/server");
const {lowestPrioritySort} = require("../util/server")
describe("Testing the controllers", () => {
  it("should load list of servers have urls", () => {
    expect(serverList).to.have.key("priority", "url");
  });

  it("should check for working servers", (done) => {
    res = {
      send: function (item) {
        expect(item).to.have.property("url");
        expect(item).to.have.property("priority");
      },
      status: function (responseStatus) {
        expect(responseStatus).to.equal(200);
        // returning this allows us to chain functions
        return this;
      },
    };
    findServer({}, res, () => {});
    done();
  });

  it("should return url if server is online", (done) => {
    const url = "http://amazon.com";
    fetchServer(url).then((result) => {
      expect(result).to.be.equal(url);
    });
    done();
  });

  it("should get error if fetching server fails", (done) => {
    const url = "http://doesnotexist.boldtech.co";
    fetchServer(url)
      .then((result) => {
        expect(result).not.to.be.equal(url);
      })
      .catch((error) => {
        console.log(error);
        expect(error).to.have.property("code", "ENOTFOUND");
      });
    done();
  });

  it("should return server with lowest priority", () => {
    const serverList = [
      {
        url: "http://amazon.com",
        priority: 1,
      },
      {
        url: "http://yahoo.com",
        priority: 3,
      },
      {
        url: "http://msn.com",
        priority: 5,
      },
      {
        url: "http://google.com",
        priority: 7,
      },
    ];
    const server = lowestPrioritySort(serverList)
    expect(server).to.have.property('url', 'http://google.com')
    expect(server).to.have.property('priority', 7)
  });
});
