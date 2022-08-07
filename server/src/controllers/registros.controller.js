const Registros = require('../models/registros')

const registrosCtrl = {}

registrosCtrl.get = async (req, res, next) => {
    const registros = await obtenerRegistros(req)
    res.json(registros)
}

const obtenerRegistros = async req => {
    return await Registros.find({ instrumento: req.params._id })
}

registrosCtrl.getPromedios = async (req, res, next) => {
    const registros = await obtenerRegistros(req)
    let porcentaje = 0, ganancia = 0, gananciaDia = 0
    registros.forEach(registro => {
        porcentaje += registro.porcentaje
        ganancia += registro.ganancia
        gananciaDia += registro.ganancia_dia
    })
    const porcentajePromedio = (porcentaje / (registros.length - 1)).toFixed(2)
    const gananciaPromedio = (ganancia / (registros.length - 1)).toFixed(2)
    const gananciaDiaPromedio = (gananciaDia / (registros.length - 1)).toFixed(2)

    const data = {
        porcentajePromedio,
        gananciaPromedio,
        gananciaDiaPromedio,
        registros
    }
    res.json(data)
}

const guardarRegistro = async req => {
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
        id_central: req.body.id_central
    })
    return await registro.save()
}

registrosCtrl.post = async (req, res, next) => {
    const registro = await guardarRegistro(req)
    res.json(registro)
}

registrosCtrl.post_registro_central = async (req, res, next) => {
    const registros = req.body.registros

    let ingreso_actual = 0, total = 0
    let registroCentralEncontrado = false;
    const instrumentoCentral = "6136e4ee3874300d8ceab12f"
    registros.forEach(async registro => {
        if (registro.instrumento === instrumentoCentral)
            registroCentralEncontrado = true

        ingreso_actual += registro.ingreso_actual
        total += registro.total
    });
    if (!registroCentralEncontrado) {
        const data = {
            body: {
                instrumento: instrumentoCentral,
                ingreso_actual: ingreso_actual.toFixed(2),
                total: total.toFixed(2),
                mes: req.body.mes
            }
        }

        const registro = await guardarRegistro(data)
        console.log("se creo registro central")
        console.log(registro)
        const registroIdCentral = registro._id
        registro.id_central = registroIdCentral
        await registro.save()

        registros.forEach(async registro => {
            const data = {
                body: registro
            }
            data.body.mes = req.body.mes
            data.body.id_central = registroIdCentral

            await guardarRegistro(data)
        });
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