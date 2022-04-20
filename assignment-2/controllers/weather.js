const { getCityKeyValue, getWeatherDetails } = require("../services/weather");

const getWeather = async (req, res) => {
  try {
    const cityName = req.body.cityName;
    const cityKeyValue = await getCityKeyValue(cityName);
    const cityForeCast = await getWeatherDetails(cityKeyValue);
    res.render("weatherDetails", {
      forecast: cityForeCast,
      cityName: cityName,
      pageTitle: "Weather Forecast",
      path: "weatherDetails",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getWeather;
