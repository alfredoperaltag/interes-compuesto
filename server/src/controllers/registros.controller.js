const Registros = require('../models/registros')

const registrosCtrl = {}
const instrumentoCentral = "6136e4ee3874300d8ceab12f"

registrosCtrl.get = async (req, res, next) => {
    const registros = await obtenerRegistros(req)
    res.json(registros)
}

registrosCtrl.getPorMes = async (req, res, next) => {
    const registros = await obtenerRegistrosPorMes(req)
    /*let total = 0

    const registroCentral = registros.find(registro => registro.instrumento == instrumentoCentral)
    if (registroCentral)
        total = registroCentral.total

    registros.forEach(registro => {
        //registro["_doc"] = let registroClone = { ...registro["_doc"] } imprimir let registroClone = { ...registro }
        registro["_doc"].portafolio = ((registro.total / total) * 100).toFixed(2)
    });*/

    res.json(registros)
}

const obtenerRegistrosPorMes = async req => {
    return await Registros.find({ id_central: req.params._id })
}

const obtenerRegistros = async req => {
    return await Registros.find({ instrumento: req.params._id })
}

registrosCtrl.getPromedios = async (req, res, next) => {
    const registros = await obtenerRegistros(req)
    let porcentaje = 0, ganancia = 0, gananciaDia = 0
    if (registros.length - 1 > 0) {
        registros.forEach(registro => {
            porcentaje += registro.porcentaje
            ganancia += registro.ganancia
            gananciaDia += registro.ganancia_dia
        })
        porcentaje = (porcentaje / (registros.length - 1)).toFixed(2)
        ganancia = (ganancia / (registros.length - 1)).toFixed(2)
        gananciaDia = (gananciaDia / (registros.length - 1)).toFixed(2)
    }

    const data = {
        porcentaje,
        ganancia,
        gananciaDia,
        registros
    }
    res.json(data)
}

const guardarRegistro = async (RegistrosTotal, req) => {
    const generateGanancia = await Registros.calcularGanancia(req.body.total, req.body.ingreso_actual, req.body.instrumento)
    const { ganancia, ganancia_historica, porcentaje, dias, ganancia_dia } = generateGanancia
    const registro = new Registros({
        mes: req.body.mes,
        ingreso_actual: req.body.ingreso_actual,
        total: req.body.total,
        porcentaje,
        ganancia_historica,
        ganancia,
        dias,
        ganancia_dia,
        instrumento: req.body.instrumento,
        id_central: req.body.id_central,
        portafolio: ((req.body.total / RegistrosTotal) * 100).toFixed(2)
    })
    return await registro.save()
}

registrosCtrl.post = async (req, res, next) => {
    const registro = await guardarRegistro(req)
    res.json(registro)
}

registrosCtrl.post_registro_central = async (req, res, next) => {
    console.log(req.body)
    const registros = req.body.registros

    let total = 0, registroCentralEncontrado = false;
    registros.forEach(async registro => {
        if (registro.instrumento === instrumentoCentral)
            registroCentralEncontrado = true

        total += registro.total
    });
    if (!registroCentralEncontrado) {
        const ultimoRegistro = await Registros.obtenerUltimoRegistro(instrumentoCentral)
        const dias = await Registros.obtenerDias(ultimoRegistro)

        const registro = new Registros({
            mes: req.body.mes,
            ingreso_actual: 0,
            total: total.toFixed(2),
            porcentaje: 0,
            ganancia_historica: 0,
            ganancia: 0,
            dias,
            ganancia_dia: 0,
            instrumento: instrumentoCentral,
            portafolio: 100
        })
        await registro.save()
        console.log("se creo registro central")
        console.log(registro)
        const registroIdCentral = registro._id
        let ingresoActual = 0, gananciaHistorica = 0, ganancia = 0, gananciaDia = 0
        for (let index = 0; index < registros.length; index++) {
            const subRegistro = registros[index];
            const data = {
                body: subRegistro
            }
            data.body.mes = req.body.mes
            data.body.id_central = registroIdCentral

            const registroGuardado = await guardarRegistro(total, data)
            ingresoActual += registroGuardado.ingreso_actual
            gananciaHistorica += registroGuardado.ganancia_historica
            ganancia += registroGuardado.ganancia
            gananciaDia += registroGuardado.ganancia_dia
        }

        registro.ingreso_actual = ingresoActual.toFixed(2)
        registro.ganancia = ganancia.toFixed(2)
        registro.ganancia_historica = gananciaHistorica.toFixed(2)
        registro.ganancia_dia = gananciaDia.toFixed(2)
        registro.porcentaje = Registros.obtenerPorcentaje(registro.ganancia_dia, registro.total)
        registro.id_central = registroIdCentral
        registro.save()
        console.log("se actualizo registro central")
        console.log(registro)
    }

    res.json({ success: true, mensaje: "registro guardado correctamente" })
}

registrosCtrl.delete_registro_central = async (req, res, next) => {
    const registros = await Registros.deleteMany({ id_central: req.params.id_central })
    if (registros.ok)
        res.json({ success: true, mensaje: "Registro central borrado correctamente" })
    else
        res.json({ success: false, mensaje: "ocurrio un error al eliminar el registro central" })
}

module.exports = registrosCtrl