const express = require ("express")

const serversRoutes = require("./routes/servers")


const app = express()


app.get('/', (req, res)=>{
    res.status(200).send('server is alive')
})

app.use('/servers', serversRoutes)




app.listen(3000)