const Instrumentos = require('../models/instrumentos')

const instrumentosCtrl = {}

instrumentosCtrl.get = async (req, res, next) => {
    const instrumentos = await Instrumentos.find({ _id: { $ne: "6136e4ee3874300d8ceab12f" }, activo: true })
    res.json(instrumentos)
}

instrumentosCtrl.postInstrumentos = async (req, res, next) => {
    const instrumentos = new Instrumentos({
        nombre: req.body.nombre,
        activo: req.body.activo
    })
    await instrumentos.save()
    res.json(instrumentos)
}

module.exports = instrumentosCtrl