const APIConfig = require("../config/weatherAPI-config.json");
const axios = require("axios");

const getCityKeyValue = async (cityName) => {
  try {
    const cityDetails = await axios.get(APIConfig.cityURL, {
      params: {
        apikey: APIConfig.APIKey,
        q: cityName,
      },
    });

    let key = "";
    cityDetails.data.forEach((item) => {
      for (let i in item) {
        if (i === "Key") {
          key = item[i];
        }
      }
    });
    return key;
  } catch (error) {
    throw new Error(error);
  }
};

const getWeatherDetails = async (cityKeyValue) => {
  const url = APIConfig.forecastURL.concat(cityKeyValue);

  try {
    const apiData = await axios.get(url, {
      params: {
        apikey: APIConfig.APIKey,
      },
    });

    const weatherForecast =
      {
        text: apiData.data.Headline.Text,
        temperature: apiData.data.DailyForecasts[0].Temperature,
        day: apiData.data.DailyForecasts[0].Day.IconPhrase,
        night: apiData.data.DailyForecasts[0].Night.IconPhrase,
      };
    return weatherForecast;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getCityKeyValue,
  getWeatherDetails,
};
