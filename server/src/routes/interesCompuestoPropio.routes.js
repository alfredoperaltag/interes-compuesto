const express = require('express')
const router = express.Router()

const interesCompuestoPropio = require('../controllers/interesCompuestoPropio.controller')

router.get('/', interesCompuestoPropio.getInteresCompuestoPropios)
router.post('/', interesCompuestoPropio.postInteresCompuestoPropios)
router.put('/:id', interesCompuestoPropio.putInteresCompuestoPropios)
router.delete('/:id', interesCompuestoPropio.deleteInteresCompuestoPropios)

module.exports = router