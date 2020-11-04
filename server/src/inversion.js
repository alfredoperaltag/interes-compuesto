let days = 680
let total = 7369
let porcentaje = 6
let gananciaDia = 0
let resultado = []
let gananciasTotales = 0
let ingresoExtraMensual = 1874
let diaDelMes = 1
let diasGenerarCentavo = 0
let diasGenerarCantidad = 0
let cantidadAConsultarPesos = 50
let gananciaActual = 0

for (let index = 0; index <= days; index++) {
    gananciaDia = (((total * porcentaje) / 100) / 365)
    if (index !== 0) {
        total = total + gananciaDia
    }
    gananciasTotales += gananciaDia
    if (diaDelMes !== 30) {
        //resultado.push({ total, gananciaDia, porcentaje, gananciasTotales })
        diaDelMes++
    } else {
        total += ingresoExtraMensual
        resultado.push({ total, gananciaDia, porcentaje, gananciasTotales, ingresoExtraMensual })
        diaDelMes = 0
    }
    if (index === 0) {
        gananciaActual = gananciaDia
    }
    if (gananciaDia.toFixed(1) > gananciaActual.toFixed(1) && diasGenerarCentavo === 0) {
        diasGenerarCentavo = index
        console.log("Dias para generar un centavo: ", diasGenerarCentavo);
    }
    if (gananciasTotales >= cantidadAConsultarPesos && diasGenerarCantidad === 0) {
        diasGenerarCantidad = index
        console.log("Dias para generar " + cantidadAConsultarPesos + " pesos: ", diasGenerarCantidad);
    }
}
console.table(resultado);
