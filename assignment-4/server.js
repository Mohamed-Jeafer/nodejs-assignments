const path = require('path');
const userController = require("./controllers/users")

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get("/view", userController.viewAllUsers)

app.get("/view/:id", userController.viewOneUser)

app.post("/add", userController.AddUsers)

app.patch("/edit/:id", userController.editUsers)



app.listen(3000);
