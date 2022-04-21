const APIConfig = require("../config/weatherAPI-config.json");
const axios = require("axios");

const getCityKeyValue = async (cityName) => {
  try {
    const cityDetails = await axios.get(APIConfig.cityURL, {
      params: {
        q: cityName,
        limit: 1,
        apikey: APIConfig.APIKey,
      },
    });
    const geo = {
      lat: cityDetails.data[0].lat,
      lon: cityDetails.data[0].lon,
    };
    return geo;
  } catch (error) {
    const err = {
      status: error.status,
      message: error.statusText,
    };
    return err;
  }
};

const getWeatherDetails = async (geo) => {
  try {
    const apiData = await axios.get(APIConfig.forecastURL, {
      params: {
        lat: geo.lat,
        lon: geo.lon,
        units: APIConfig.units,
        appid: APIConfig.APIKey,
      },
    });
    const weatherForecast = {
      status: apiData.status,
      text: apiData.data.weather[0].description,
      temperature: apiData.data.main,
      temp_min: apiData.data.main.temp_min,
      temp_max: apiData.data.main.temp_max,
    };
    return weatherForecast;
  } catch (error) {
    const err = {
      status: error.status,
      message: error.statusText,
    };
    return err;
  }
};

module.exports = {
  getCityKeyValue,
  getWeatherDetails,
};
