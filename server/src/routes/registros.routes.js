const express = require('express')
const router = express.Router()

const registros = require('../controllers/registros.controller')

router.get('/:_id', registros.get)
router.post('/', registros.post)

module.exports = router