const Registros = require('../models/registros')

const registrosCtrl = {}

registrosCtrl.get = async (req, res, next) => {
    const registros = await Registros.find({_id: req.params._id})
    res.json(registros)
}

registrosCtrl.post = async (req, res, next) => {
    const generateGanancia = await Registros.calcularGanancia(req.body._id, req.body.total, req.body.ingreso_actual)
    const { ganancia, ganancia_historica, porcentaje, dias } = generateGanancia
    const registros = new Registros({
        mes: req.body.mes,
        ingreso_actual: req.body.ingreso_actual,
        total: req.body.total,
        porcentaje,
        ganancia_historica,
        ganancia,
        dias,
        instrumento: req.body.instrumento
    })
    await registros.save()
    res.json(registros)
}

module.exports = registrosCtrl