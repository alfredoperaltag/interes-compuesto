const InteresCompuestoPropio = require('../models/interesCompuestoPropio')

const interesCompuestoPropioCtrl = {}

interesCompuestoPropioCtrl.getInteresCompuestoPropios = async (req, res, next) => {
    const interesCompuestoPropio = await InteresCompuestoPropio.find()
    res.json(interesCompuestoPropio)
}

interesCompuestoPropioCtrl.postInteresCompuestoPropios = async (req, res, next) => {
    const gananciaHistorica = (req.body.interesesCompuestos - req.body.ingresosExtrasMensuales).toFixed(2)
    const ultimateInteresCompuestoPropio = await InteresCompuestoPropio.find().sort({ $natural: -1 }).limit(1)
    const ganancia = (gananciaHistorica - ultimateInteresCompuestoPropio[0].gananciaHistorica).toFixed(2)
    let porcentaje = 0
    if (req.body.interesesCompuestos !== 0) {
        porcentaje = (((ganancia / 30) / req.body.interesesCompuestos) * 36500).toFixed(2)
    }
    const interesCompuestoPropio = new InteresCompuestoPropio({
        meses: req.body.meses,
        ingresosExtrasMensuales: req.body.ingresosExtrasMensuales,
        interesesCompuestos: req.body.interesesCompuestos,
        porcentaje,
        gananciaHistorica,
        ganancia
    })
    await interesCompuestoPropio.save()
    res.json(interesCompuestoPropio)
}

interesCompuestoPropioCtrl.putInteresCompuestoPropios = async (req, res, next) => {
    const gananciaHistorica = (req.body.interesesCompuestos - req.body.ingresosExtrasMensuales).toFixed(2)
    const interesesCompuestosPropios = await InteresCompuestoPropio.find()
    const positionInteresCompuestoPropio = interesesCompuestosPropios.findIndex(element => element.id === req.body._id)
    const beforeInteresCompuestoPropio = interesesCompuestosPropios[positionInteresCompuestoPropio - 1]
    let ganancia = 0
    if (beforeInteresCompuestoPropio) {
        if (beforeInteresCompuestoPropio.gananciaHistorica !== undefined) {
            ganancia = (gananciaHistorica - beforeInteresCompuestoPropio.gananciaHistorica).toFixed(2)
        }
    }
    let porcentaje = 0
    if (req.body.interesesCompuestos !== 0) {
        porcentaje = (((ganancia / 30) / req.body.interesesCompuestos) * 36500).toFixed(2)
    }
    req.body = { ...req.body, ganancia, porcentaje, gananciaHistorica }
    const { id } = req.params
    const interesCompuestoPropio = await InteresCompuestoPropio.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    res.json(interesCompuestoPropio)
}

interesCompuestoPropioCtrl.deleteInteresCompuestoPropios = async (req, res, next) => {
    const interesCompuestoPropio = await InteresCompuestoPropio.findByIdAndRemove(req.params.id)
    res.json(interesCompuestoPropio)
}

module.exports = interesCompuestoPropioCtrl