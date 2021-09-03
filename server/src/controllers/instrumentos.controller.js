const Instrumentos = require('../models/instrumentos')

const instrumentosCtrl = {}

instrumentosCtrl.get = async (req, res, next) => {
    const instrumentos = await Instrumentos.find()
    res.json(instrumentos)
}

instrumentosCtrl.postInstrumentos = async (req, res, next) => {
    const instrumentos = new Instrumentos({
        nombre: req.body.nombre,
    })
    await instrumentos.save()
    res.json(instrumentos)
}

module.exports = instrumentosCtrl