const express = require ("express")

const serversRoutes = require("./routes/servers")


const app = express()


app.get('/', (req, res)=>{
    res.redirect('/servers/find-server')
})

app.use('/servers', serversRoutes)




app.listen(3000)