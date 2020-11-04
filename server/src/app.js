const express = require('express')
const cors = require("cors");

const inversion = require('./middlewares/inversion')

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

app.use(cors());
//necesario para recibir y enviar json
app.use(express.json())

app.get('', (req, res) => {
    res.send('Hello World')
})

app.post('', inversion, (req, res, next) => { })

module.exports = app