const express = require('express')
const mongoose = require('mongoose')
const { routes } = require('../mrg_test_task_backend/src/routes')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')


mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Connected to DB!')
)

const app = express()
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    credentials: true,
    origin: 'http://217.160.214.250',
    optionsSuccessStatus: 200
}


routes.forEach((item) => {
    app.use(`/api/v1/${item}`, cors(corsOptions), require(`./src/routes/${item}`))
})

app.listen(3000)