const { getDb } = require("../helpers/mongodb");
const { collection } = require("../config/database-config.json");

class WeatherForecast {
  constructor(cityName, country, description, temperature, min_temp, max_temp) {
    this.cityName = cityName;
    this.country = country;
    this.description = description;
    this.temperature = temperature;
    this.min_temp = min_temp;
    this.max_temp = max_temp;
  }
  async save() {
    const db = getDb();
    try {
      await db.collection(collection).insertOne(this);
    } catch (error) {
      throw new Error(error);
    }
  }

  getForecast() {
    return this;
  }

  async upsert() {
    const db = getDb();
    try {
      const query = { cityName: this.cityName };
      const update = { $set: this };
      const options = { upsert: true };
      await db.collection(collection).updateOne(query, update, options);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const findOne = async (cityName) => {
    if (!cityName) {
        return;
    }
    const db = getDb();
  try {
    const query = {cityName};
    const result = await db.collection(collection).findOne(query);
    return result;
  } catch (error) {
    throw new Error (error)
  }
};

module.exports = {
  WeatherForecast,
  findOne,
};
