const express = require('express')
const router = express.Router()

const registros = require('../controllers/registros.controller')

router.get('/:_id', registros.get)
router.get('/promedios/:_id', registros.getPromedios)
router.post('/', registros.post)
router.post('/registro_central', registros.post_registro_central)
router.delete('/registro_central/:id_central', registros.delete_registro_central)

module.exports = router