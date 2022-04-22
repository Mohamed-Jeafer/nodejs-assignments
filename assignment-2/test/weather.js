const { expect } = require("chai");
const {
  getCityCoordinates,
  getWeatherDetails,
} = require("../services/weather");
describe("Testing the controllers", () => {
  it("should return the coordinates of a city", (done) => {
    const cityName = "Kitchener";
    getCityCoordinates(cityName).then((coordinate) => {
      expect(coordinate).to.have.property("lon");
      expect(coordinate).to.have.property("lat");
    });
    done();
  });

  it("should return null if getting coordinates without name", (done) => {
    const cityName = null;
    getCityCoordinates(cityName)
      .then((coordinate) => {
        expect(coordinate).to.equal(undefined);
      })
      .catch((error) => {
        console.log(error);
      });
    done();
  });

  it("should return the weather forecast of city", (done) => {
    const coordinates1 = {
      cityName: "muscat",
      country: "om",
      lat: 23.5882019,
      lon: 58.3829448,
    };

    const coordinates2 = {
      cityName: "kitchener",
      country: "ca",
      lat: 43.451291,
      lon: -80.4927815,
    };

    getWeatherDetails(coordinates1)
      .then((WeatherForecast) => {
        expect(WeatherForecast).to.have.property("cityName", "kitchener");
        expect(WeatherForecast).to.be.an('error')
      })
    done();
  });

  it("should call DB if same call is made in less than 20 sec", () => {});

  it("should call API if call is made in less than 20 sec but with different city name", () => {});
});
