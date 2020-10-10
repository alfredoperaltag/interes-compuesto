const moment = require('moment')

const inversion = (req, res, next) => {
    let calendario = moment(req.body.calendario)
    let days = calendario.diff(moment(), 'days')
    let dineroInicial = parseFloat(req.body.dineroInicial)
    let porcentaje = parseFloat(req.body.porcentaje)
    let ingresoExtraMensual = parseFloat(req.body.ingresoExtraMensual)
    let cantidadConsultar = parseFloat(req.body.cantidadConsultar)
    let dineroInicialInput = dineroInicial
    let dineroTotal = dineroInicial
    let gananciaDia = 0
    let gananciaActual = 0
    let gananciasTotales = 0
    let diasGenerarCentavo = 0
    let diasGenerarCantidad = 0
    let diaDelMes = 1
    let numeroMes = 0
    let meses = []
    let dinerosIniciales = []
    let ingresosExtrasMensuales = []
    let interesesCompuestos = []
    //let resultado = []

    for (let day = 0; day <= days; day++) {
        gananciaDia = (((dineroInicial * porcentaje) / 100) / 365)
        if (day === 0) {
            gananciaActual = gananciaDia

            meses.push("Inicial")
            dinerosIniciales.push(dineroInicialInput.toFixed(2))
            ingresosExtrasMensuales.push(dineroTotal.toFixed(2))
            interesesCompuestos.push(dineroInicial.toFixed(2))
        } else {
            //if (day !== 0) {
            dineroInicial += gananciaDia
        }
        gananciasTotales += gananciaDia
        if (gananciaDia.toFixed(1) > gananciaActual.toFixed(1) && diasGenerarCentavo === 0) {
            diasGenerarCentavo = day
        }
        if (gananciasTotales >= cantidadConsultar && diasGenerarCantidad === 0) {
            diasGenerarCantidad = day
        }

        if (diaDelMes === 30) {
            //resultado.push({ dineroInicial, gananciaDia, porcentaje, gananciasTotales, ingresoExtraMensual })
            numeroMes++
            meses.push("Mes " + numeroMes)
            dinerosIniciales.push(dineroInicialInput.toFixed(2))
            dineroTotal += ingresoExtraMensual
            ingresosExtrasMensuales.push(dineroTotal.toFixed(2))
            dineroInicial += ingresoExtraMensual
            interesesCompuestos.push(dineroInicial.toFixed(2))
            diaDelMes = 0
        } else {
            diaDelMes++
        }
    }
    res.send({
        interesesCompuestos,
        dinerosIniciales,
        meses,
        ingresosExtrasMensuales,
        labelGenerarCentavo: diasGenerarCentavo,
        labelCantidadConsultada: diasGenerarCantidad,
        cantidadConsultar: req.body.cantidadConsultar
    })
    next()
}

module.exports = inversion