const express = require('express');
const weatherController = require("../controllers/weather")
const router = express.Router();

router.get('/', (req, res)=>{
    res.render("index", {
        pageTitle: "Weather App",
        path: "/index",
      });
})

router.post('/fetchWeather', weatherController)



module.exports = router;
