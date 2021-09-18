const Registros = require('../models/registros')

const registrosCtrl = {}

registrosCtrl.get = async (req, res, next) => {
    const registros = await Registros.find({ instrumento: req.params._id })
    res.json(registros)
}

registrosCtrl.post = async (req, res, next) => {
    const generateGanancia = await Registros.calcularGanancia(req.body._id, req.body.total, req.body.ingreso_actual, req.body.instrumento)
    const { ganancia, ganancia_historica, porcentaje, dias } = generateGanancia
    const registros = new Registros({
        mes: req.body.mes,
        ingreso_actual: req.body.ingreso_actual,
        total: req.body.total,
        porcentaje,
        ganancia_historica,
        ganancia,
        dias,
        instrumento: req.body.instrumento
    })
    await registros.save()
    res.json(registros)
}

registrosCtrl.post_registro_central = async (req, res, next) => {
    const registros = req.body.registros

    let ingreso_actual = 0, total = 0
    let registroCentralEncontrado = false;
    const instrumentoCentral = "6136e4ee3874300d8ceab12f"
    registros.forEach(async registro => {
        const data = {
            body: registro
        }
        data.body.mes = req.body.mes

        if (registro.instrumento === instrumentoCentral)
            registroCentralEncontrado = true

        ingreso_actual += registro.ingreso_actual
        total += registro.total

        await registrosCtrl.post(data, res)
    });
    if (!registroCentralEncontrado) {
        console.log("se creo registro central")
        const data = {
            body: {
                instrumento: instrumentoCentral,
                ingreso_actual,
                total: total.toFixed(2),
                mes: req.body.mes
            }
        }
        console.log(data)

        await registrosCtrl.post(data, res)
    }

    res.json({ success: true, mensaje: "registro guardado correctamente" })
}

registrosCtrl.delete_registro_central = async (req, res, next) => {
    const registros = await Registros.deleteMany({ mes: req.params.mes })
    if (registros.ok)
        res.json({ success: true, mensaje: "Registro central borrado correctamente" })
    else
        res.json({ success: false, mensaje: "ocurrio un error al eliminar el registro central" })
}

module.exports = registrosCtrl