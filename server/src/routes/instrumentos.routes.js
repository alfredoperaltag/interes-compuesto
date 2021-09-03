const express = require('express')
const router = express.Router()

const instrumentos = require('../controllers/instrumentos.controller')

router.get('/', instrumentos.get)
router.post('/', instrumentos.postInstrumentos)

module.exports = router