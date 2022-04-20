const { getCityKeyValue, getWeatherDetails } = require("../services/weather");

const getWeather = async (req, res, next) => {
  try {
    const cityName = req.body.cityName;
    const cityKeyValue = await getCityKeyValue(cityName);
    const cityForecast = await getWeatherDetails(cityKeyValue);
    res.render("weatherDetails", {
      forecast: cityForecast,
      cityName: cityName,
      pageTitle: "Weather Forecast",
      path: "weatherDetails",
    });
  } catch (error) {
      console.log(error);
      res.redirect('/weather/weatherDetailsNotFound')
      next()
  }
};

module.exports = getWeather;
