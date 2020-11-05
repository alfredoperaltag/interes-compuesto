const express = require('express')
const router = express.Router()

const interesCompuestoPropio = require('../controllers/interesCompuestoPropio.controller')

router.get('/', interesCompuestoPropio.getInteresCompuestoPropios)
router.post('/', interesCompuestoPropio.postInteresCompuestoPropios)

module.exports = router