const mongoose = require('mongoose')
const { Schema } = mongoose
const moment = require('moment')

const interesCompuestoPropio = new Schema({
    meses: { type: String, required: true },
    ingresosExtrasMensuales: { type: Number, required: true },
    interesesCompuestos: { type: Number, required: true },
    ganancia: { type: Number, required: true },
    porcentaje: { type: Number, required: true },
    dias: { type: Number, required: true },
    gananciaHistorica: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
})

interesCompuestoPropio.statics.generateGanancia = async (id, interesesCompuestos, ingresosExtrasMensuales) => {
    const gananciaHistorica = (interesesCompuestos - ingresosExtrasMensuales).toFixed(2)

    let ganancia = 0
    let porcentaje = 0
    let dias = 0
    if (id) {
        const interesesCompuestosPropios = await InteresCompuestoPropio.find()
        const positionInteresCompuestoPropio = interesesCompuestosPropios.findIndex(element => element.id === id)
        const beforeInteresCompuestoPropio = interesesCompuestosPropios[positionInteresCompuestoPropio - 1]
        if (beforeInteresCompuestoPropio) {
            if (beforeInteresCompuestoPropio.gananciaHistorica !== undefined) {
                ganancia = (gananciaHistorica - beforeInteresCompuestoPropio.gananciaHistorica).toFixed(2)
            }
        }
        if (interesesCompuestos !== 0) {
            const interesCompuestoPropio = await InteresCompuestoPropio.findById(id)
            const createdAt = moment(interesCompuestoPropio.createdAt)
            let days = createdAt.diff(moment(beforeInteresCompuestoPropio.createdAt), 'days')
            dias = days
            days === 0 ? days = 30 : days
            porcentaje = (((ganancia / days) / interesesCompuestos) * 36500).toFixed(2)
        }
    } else {
        const ultimateInteresCompuestoPropio = await InteresCompuestoPropio.find().sort({ $natural: -1 }).limit(1)
        ganancia = (gananciaHistorica - ultimateInteresCompuestoPropio[0].gananciaHistorica).toFixed(2)

        if (interesesCompuestos !== 0) {
            const createdAt = moment()
            let days = createdAt.diff(moment(ultimateInteresCompuestoPropio[0].createdAt), 'days')
            dias = days
            days === 0 ? days = 30 : days
            porcentaje = (((ganancia / days) / interesesCompuestos) * 36500).toFixed(2)
        }
    }

    return { gananciaHistorica, ganancia, porcentaje, dias }
}

const InteresCompuestoPropio = mongoose.model('InteresCompuestoPropio', interesCompuestoPropio)

module.exports = InteresCompuestoPropio