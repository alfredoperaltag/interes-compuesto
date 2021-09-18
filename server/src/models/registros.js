const mongoose = require('mongoose')
const { Schema } = mongoose
const moment = require('moment')

const registros = new Schema({
    mes: { type: String, required: true },
    ingreso_actual: { type: Number, required: true },
    total: { type: Number, required: true },
    ganancia: { type: Number, required: true },
    porcentaje: { type: Number, required: true },
    dias: { type: Number, required: true },
    ganancia_historica: { type: Number, required: true },
    instrumento: { type: mongoose.Schema.Types.ObjectId, required: true }
}, {
    timestamps: true,
    versionKey: false
})

registros.statics.calcularGanancia = async (id, total, ingresoActual, instrumento) => {
    const ganancia_historica = (total - ingresoActual).toFixed(2)

    let ganancia = 0
    let porcentaje = 0
    let dias = 0
    if (id) {
        const registros = await Registros.find()
        const positionInteresCompuestoPropio = registros.findIndex(element => element.id === id)
        const beforeInteresCompuestoPropio = registros[positionInteresCompuestoPropio - 1]
        if (beforeInteresCompuestoPropio) {
            if (beforeInteresCompuestoPropio.gananciaHistorica !== undefined) {
                ganancia = (ganancia_historica - beforeInteresCompuestoPropio.gananciaHistorica).toFixed(2)
            }
        }
        if (total !== 0) {
            const interesCompuestoPropio = await Registros.findById(id)
            const createdAt = moment(interesCompuestoPropio.createdAt)
            let days = createdAt.diff(moment(beforeInteresCompuestoPropio.createdAt), 'days')
            dias = days
            days === 0 ? days = 30 : days
            porcentaje = (((ganancia / days) / total) * 36500).toFixed(2)
        }
    } else {
        const ultimoRegistro = await Registros.find({ instrumento }).sort({ $natural: -1 }).limit(1)

        if (ultimoRegistro[0]) {
            ganancia = (ganancia_historica - ultimoRegistro[0].ganancia_historica).toFixed(2)
            const createdAt = moment()
            let days = createdAt.diff(moment(ultimoRegistro[0].createdAt), 'days')
            dias = days
            days === 0 ? days = 30 : days
            if (total !== 0)
                porcentaje = (((ganancia / days) / total) * 36500).toFixed(2)
        } else {
            const registros = new Registros({
                mes: "0",
                ingreso_actual: 0,
                total: 0,
                ganancia: 0,
                porcentaje: 0,
                dias: 0,
                ganancia_historica: 0,
                instrumento
            })
            await registros.save()
        }
    }

    return { ganancia_historica, ganancia, porcentaje, dias }
}

const Registros = mongoose.model('Registros', registros)

module.exports = Registros