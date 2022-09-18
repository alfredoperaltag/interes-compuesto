const Instrumentos = require('../models/instrumentos')
const Registros = require('../models/registros')

const instrumentosCtrl = {}

instrumentosCtrl.get = async (req, res, next) => {
    const instrumentos = await Instrumentos.find({ _id: { $ne: "6136e4ee3874300d8ceab12f" }, activo: true })
    res.json(instrumentos)
}

instrumentosCtrl.postInstrumentos = async (req, res, next) => {
    const instrumentos = new Instrumentos({
        nombre: req.body.nombre,
        activo: req.body.activo,
        color: req.body.color
    })
    await instrumentos.save()

    const registro = new Registros({
        mes: "0",
        ingreso_actual: req.body.ingreso_actual,
        total: req.body.ingreso_actual,
        ganancia: 0,
        porcentaje: 0,
        dias: 0,
        ganancia_dia: 0,
        ganancia_historica: 0,
        instrumento: instrumentos.id,
        portafolio: 0
    })
    await registro.save()

    res.json(instrumentos)
}

module.exports = instrumentosCtrl