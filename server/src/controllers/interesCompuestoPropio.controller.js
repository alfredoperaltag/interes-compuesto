const InteresCompuestoPropio = require('../models/interesCompuestoPropio')

const interesCompuestoPropioCtrl = {}

interesCompuestoPropioCtrl.getInteresCompuestoPropios = async (req, res, next) => {
    const interesCompuestoPropio = await InteresCompuestoPropio.find()
    res.json(interesCompuestoPropio)
}

interesCompuestoPropioCtrl.postInteresCompuestoPropios = async (req, res, next) => {
    const generateGanancia = await InteresCompuestoPropio.generateGanancia(req.body._id, req.body.interesesCompuestos, req.body.ingresosExtrasMensuales)
    const { ganancia, gananciaHistorica, porcentaje, dias } = generateGanancia

    const interesCompuestoPropio = new InteresCompuestoPropio({
        meses: req.body.meses,
        ingresosExtrasMensuales: req.body.ingresosExtrasMensuales,
        interesesCompuestos: req.body.interesesCompuestos,
        porcentaje,
        gananciaHistorica,
        ganancia,
        dias
    })
    await interesCompuestoPropio.save()
    res.json(interesCompuestoPropio)
}

interesCompuestoPropioCtrl.putInteresCompuestoPropios = async (req, res, next) => {
    const generateGanancia = await InteresCompuestoPropio.generateGanancia(req.body._id, req.body.interesesCompuestos, req.body.ingresosExtrasMensuales)
    const { ganancia, gananciaHistorica, porcentaje, dias } = generateGanancia

    req.body = { ...req.body, ganancia, porcentaje, gananciaHistorica, dias }
    const { id } = req.params
    const interesCompuestoPropio = await InteresCompuestoPropio.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    res.json(interesCompuestoPropio)
}

interesCompuestoPropioCtrl.deleteInteresCompuestoPropios = async (req, res, next) => {
    const interesCompuestoPropio = await InteresCompuestoPropio.findByIdAndRemove(req.params.id)
    res.json(interesCompuestoPropio)
}

module.exports = interesCompuestoPropioCtrl