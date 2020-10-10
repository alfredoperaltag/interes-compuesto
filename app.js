const express = require('express')
const cors = require("cors");

const app = express()
const port = process.env.PORT || 5000

app.use(cors());

app.get('', (req, res) => {
    res.send('Hello World')
})

app.post('', (req, res) => {
    console.log(req.body);
    res.send(req.body)
})

app.listen(port, () => {
    console.log('Server is up on port', port);
})