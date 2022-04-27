const { getCityCoordinates, getWeatherDetails } = require("../services/weather");
const { findOne } = require("../models/weather");


const getWeather = throttle(async (req, res, next) => {
  const forecast = await callAPI(req, res, next);
  renderWeatherPage(forecast, req, res, next);
});

//throttle is responsible for the delay
function throttle(cb, delay = 20000) {
  let shouldWait = false;
  let cityName;

  return async (...args) => {
    const [req] = args;
    if (shouldWait && cityName === req.body.cityName.toLowerCase()) {
      // last call less than delay period
      const forecast = await callDb(...args);
      renderWeatherPage(forecast, ...args);
      return;
    }

    // last call is more than delay period
    cb(...args);
    shouldWait = true;
    cityName = req.body.cityName.toLowerCase()
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

const renderWeatherPage = async (forecast, ...args) => {
  const [req, res] = args;
  if (!forecast){
   return res.render("weatherDetails", {
      forecast: null,
      pageTitle: "Weather Forecast",
    });
  }
  res.render("weatherDetails", {
    forecast,
    pageTitle: "Weather Forecast",
  });
};
const callAPI = async (req, res, next) => {
  try {
    const cityName = req.body.cityName.toLowerCase();
    const coordinates = await getCityCoordinates(cityName);
    const forecast = await getWeatherDetails(coordinates);
    return forecast;
  } catch (error) {
    console.log(error);
  }
};

const callDb = async (...args) => {
  const [req] = args;
  try {
    const cityName = req.body.cityName.toLowerCase();
    const forecast = await findOne(cityName);
    return forecast;
  } catch (error) {}
};
module.exports = getWeather;
