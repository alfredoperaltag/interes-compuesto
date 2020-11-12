const mongoose = require('mongoose')
const { Schema } = mongoose

const interesCompuestoPropio = new Schema({
    meses: { type: String, required: true },
    ingresosExtrasMensuales: { type: Number, required: true },
    interesesCompuestos: { type: Number, required: true },
    ganancia: { type: Number, required: true },
    porcentaje: { type: Number, required: true },
    gananciaHistorica: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
})

interesCompuestoPropio.statics.generateGanancia = async (id, interesesCompuestos, ingresosExtrasMensuales) => {
    const gananciaHistorica = (interesesCompuestos - ingresosExtrasMensuales).toFixed(2)

    let ganancia = 0
    if (id) {
        const interesesCompuestosPropios = await InteresCompuestoPropio.find()
        const positionInteresCompuestoPropio = interesesCompuestosPropios.findIndex(element => element.id === id)
        const beforeInteresCompuestoPropio = interesesCompuestosPropios[positionInteresCompuestoPropio - 1]
        if (beforeInteresCompuestoPropio) {
            if (beforeInteresCompuestoPropio.gananciaHistorica !== undefined) {
                ganancia = (gananciaHistorica - beforeInteresCompuestoPropio.gananciaHistorica).toFixed(2)
            }
        }
    } else {
        const ultimateInteresCompuestoPropio = await InteresCompuestoPropio.find().sort({ $natural: -1 }).limit(1)
        ganancia = (gananciaHistorica - ultimateInteresCompuestoPropio[0].gananciaHistorica).toFixed(2)
    }

    let porcentaje = 0
    if (interesesCompuestos !== 0) {
        porcentaje = (((ganancia / 30) / interesesCompuestos) * 36500).toFixed(2)
    }

    return { gananciaHistorica, ganancia, porcentaje }
}

const InteresCompuestoPropio = mongoose.model('InteresCompuestoPropio', interesCompuestoPropio)

module.exports = InteresCompuestoPropio