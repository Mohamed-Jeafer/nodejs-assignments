const { getCityKeyValue, getWeatherDetails } = require("../services/weather");

let cityForecast;
let cityName
const getWeather = (req, res, next) => {
  updateWeather(req, res, next);
};

const renderWeatherPage = (req, res) => {
  res.render("weatherDetails", {
    forecast: cityForecast,
    cityName: cityName,
    pageTitle: "Weather Forecast",
    path: "weatherDetails",
  });
};
const updateWeather = throttle(async (req, res, next) => {
  try {
    cityName = req.body.cityName;
    const cityGeoCoord = await getCityKeyValue(cityName);
    cityForecast = await getWeatherDetails(cityGeoCoord);
    if (
      cityForecast &&
      cityForecast.status >= 200 &&
      cityForecast.status < 300
    ) {
      renderWeatherPage(req, res);
    }
    // else {
    //   res
    //     .status(cityForecast.status)
    //     .redirect("/weather/weatherDetailsNotFound");
    // }
  } catch (error) {
    console.log(error);
    res.redirect("/weather/weatherDetailsNotFound");
    next();
  }
});

function throttle(cb, delay = 20000) {
  let shouldWait = false;
  
  return (req, res, next) => {
    console.log(req.body.cityName)
    if (shouldWait && cityName === req.body.cityName) {
      console.log("Getting data from DB");
      renderWeatherPage(req, res)
      return;
    }
    
    cb(req, res, next);
    console.log("Getting data from API");
    shouldWait = true
    setTimeout(() => {
      console.log("Done waiting")
      shouldWait = false;
    }, delay);
  };
}

module.exports = getWeather;
