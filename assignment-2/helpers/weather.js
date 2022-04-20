const { getCityKeyValue } = require("../services/weather");
const getCityKey = (cityName) => {
  const key = getCityKeyValue(cityName);
  return key;
};

module.exports = getCityKey;
