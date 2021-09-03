const mongoose = require('mongoose')
const { Schema } = mongoose

const instrumentos = new Schema({
    nombre: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
})

const Instrumentos = mongoose.model('Instrumentos', instrumentos)

module.exports = Instrumentos