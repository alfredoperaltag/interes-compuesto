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
    ganancia_dia: { type: Number, required: true },
    ganancia_historica: { type: Number, required: true },
    portafolio: { type: Number, required: true },
    cantidadAInvertir: { type: Number, required: true },
    instrumento: { type: mongoose.Schema.Types.ObjectId, required: true },
    id_central: { type: mongoose.Schema.Types.ObjectId, required: false },
    aporte: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
})

registros.statics.obtenerUltimoRegistro = async (instrumento) => await Registros.find({ instrumento }).sort({ $natural: -1 }).limit(1)

registros.statics.obtenerDias = (ultimoRegistro) => {
    const createdAt = moment()
    return createdAt.diff(moment(ultimoRegistro[0].createdAt), 'days')
}

registros.statics.obtenerPorcentaje = (ganancia_dia, total) => (((ganancia_dia) / total) * 36500).toFixed(2)

registros.statics.calcularGanancia = async (total, ingresoActual, instrumento) => {
    const ganancia_historica = (total - ingresoActual).toFixed(2)

    let ganancia_dia = 0
    let porcentaje = 0
    let dias = 0

    const ultimoRegistro = await Registros.obtenerUltimoRegistro(instrumento)
    let days = await Registros.obtenerDias(ultimoRegistro)
    let ganancia = (ganancia_historica - ultimoRegistro[0].ganancia_historica).toFixed(2)
    const aporte = (ingresoActual - ultimoRegistro[0].ingreso_actual).toFixed(2)
    dias = days
    days = days === 0 ? 30 : days
    if (total !== 0) {
        ganancia_dia = ganancia / days
        porcentaje = Registros.obtenerPorcentaje(ganancia_dia, total)
        ganancia_dia = ganancia_dia.toFixed(2)
    }

    return { ganancia_historica, ganancia, porcentaje, dias, ganancia_dia, aporte }
}

const Registros = mongoose.model('Registros', registros)

module.exports = Registros