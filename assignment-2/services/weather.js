const APIConfig = require("../config/weatherAPI-config.json");
const { WeatherForecast } = require("../models/weather");
const axios = require("axios");

const getCityCoordinates = async (cityName) => {
  if (!cityName) {
    return;
  }
  try {
    const response = await axios.get(APIConfig.coordinatesURL, {
      params: {
        q: cityName,
        limit: 1,
        apikey: APIConfig.APIKey,
      },
    });
    const coordinates = getCoordinates(response);
    return coordinates;
  } catch (error) {
    throw new Error(error);
  }
};

const getWeatherDetails = async (coordinates) => {
  if (!coordinates) {
    return;
  }
  try {
    const response = await axios.get(APIConfig.forecastURL, {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
        units: APIConfig.units,
        appid: APIConfig.APIKey,
      },
    });
    const weatherForecast = getWeatherForecastObject(coordinates, response);
    weatherForecast.upsert();
    return weatherForecast;
  } catch (error) {
    throw new Error(error);
  }
};

function getWeatherForecastObject(coordinates, response) {
  if (!response.data) {
    return;
  }
  const forecast = new WeatherForecast(
    coordinates.cityName,
    coordinates.country,
    response.data.weather[0].description,
    response.data.main,
    response.data.main.temp_min,
    response.data.main.temp_max
  );
  return forecast;
}

function getCoordinates(response) {
  if (!response.data || response.data.length < 1) {
    return;
  }
  
  const data = {
    cityName: response.data[0].name.toLowerCase(),
    country: response.data[0].country.toLowerCase(),
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };
  return data;
}

module.exports = {
  getCityCoordinates,
  getWeatherDetails,
};
