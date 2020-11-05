const InteresCompuestoPropio = require('../models/interesCompuestoPropio')

const interesCompuestoPropioCtrl = {}

interesCompuestoPropioCtrl.getInteresCompuestoPropios = async (req, res, next) => {
    const interesCompuestoPropio = await InteresCompuestoPropio.find()
    res.json(interesCompuestoPropio)
}

interesCompuestoPropioCtrl.postInteresCompuestoPropios = async (req, res, next) => {
    const interesCompuestoPropio = new InteresCompuestoPropio({
        meses: req.body.meses,
        ingresosExtrasMensuales: req.body.ingresosExtrasMensuales,
        interesesCompuestos: req.body.interesesCompuestos
    })
    await interesCompuestoPropio.save()
    res.json(interesCompuestoPropio)
}

module.exports = interesCompuestoPropioCtrl