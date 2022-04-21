const { getCityKeyValue, getWeatherDetails } = require("../services/weather");

const getWeather = async (req, res, next) => {
  try {
    const cityName = req.body.cityName;
    const cityKeyValue = await getCityKeyValue(cityName);
    const cityForecast = await getWeatherDetails(cityKeyValue);
    if (cityForecast.status >=200 && cityForecast.status <300){
      res.render("weatherDetails", {
        forecast: cityForecast,
        cityName: cityName,
        pageTitle: "Weather Forecast",
        path: "weatherDetails",
      });
    } else {
      console.log(cityForecast.status)
      res.status(cityForecast.status).redirect('/weather/weatherDetailsNotFound')
    }
  } catch (error) {
      console.log(error);
      res.redirect('/weather/weatherDetailsNotFound')
      next()
  }
};

module.exports = getWeather;
