const mongoose = require('mongoose')
const { Schema } = mongoose

const interesCompuestoPropio = new Schema({
    meses: { type: String, required: true },
    ingresosExtrasMensuales: { type: Number, required: true },
    interesesCompuestos: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('InteresCompuestoPropio', interesCompuestoPropio)