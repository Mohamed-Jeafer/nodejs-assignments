const { MongoClient, ServerApiVersion } = require("mongodb");
const { uri, database } = require("../config/database-config.json");

let _db;

const mongoConnect = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  try {
    await client.connect();
    _db = client.db(database);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database was found";
};

module.exports = {
  mongoConnect,
  getDb,
};
