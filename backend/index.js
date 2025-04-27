require('./models/User')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const requireAuth = require("./middlewares/requireAuth")
const port = 3000

app.use(bodyParser.json())
app.use(authRoutes)

const mongoClient = require('mongoose')
const mongoUri = 'mongodb+srv://danynjambou:adminadmin@cluster0.rmdgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoClient.connect(mongoUri)
mongoClient.connection.on('connected', () => {
    console.log('Successfully connected to cluster0')
})
mongoClient.connection.on('error', err => console.error(err))
app.get('/', requireAuth, (req, res) => {
    const { name, email } = req.user
    res.send({name, email})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})