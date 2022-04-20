const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");


const weatherRoutes = require("./routes/weather")


const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/weather', weatherRoutes)

app.get('/', (req, res)=>{
    res.send('server is alive')
})

app.listen(3000);
