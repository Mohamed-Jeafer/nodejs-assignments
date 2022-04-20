const express = require('express');
const weatherController = require("../controllers/weather")
const router = express.Router();

router.get('/', (req, res)=>{
    res.render("index", {
        pageTitle: "Weather App",
        path: "/index",
        cityName: ""
      });
})

router.post('/fetchWeather', weatherController)

router.get('/weatherDetailsNotFound', (req, res)=>{
    res.status(500).send('Ups, There was an error fetching the weather details')
})



module.exports = router;
