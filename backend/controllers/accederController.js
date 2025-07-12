const usuarioModel = require('../models/usuarios_model.js');
const bcryptjs = require('bcryptjs')
const jtw = require('jsonwebtoken')

class ErrorDetallado extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}

class accederControllers {
    async verificar(req, res, next) {
        const acceder = req.body 
        try {
            if (!acceder.Usuario || !acceder.Contrasena) {
                throw new ErrorDetallado('Datos de entrada incorrecto o faltante',400)
            }
            const db = await usuarioModel.find({'correo':acceder.Usuario});
            if (db.length < 1) {
                throw new ErrorDetallado('Usuario no encontrado',401)
            }else if (db.length >= 2){
                throw new ErrorDetallado('Usuario registrado mas de una vez',404)
            }
            const resultado = db[0]
            //encriptado
            const verificarContraseña = await bcryptjs.compare(acceder.Contrasena, resultado.contrasena)
            //comparación 
            if (verificarContraseña == false) {
                throw new ErrorDetallado('Contraseña incorrecta',401)
            }
            const payload = {
                Nombre:acceder.Name,
                Rol:db[0].rol
            }
            const token = jtw.sign(payload,process.env.tokenClave || 'secreto', { expiresIn: '7d' })
            res.status(200).send({"exito":true, "nombre":resultado.nombre,'rol':resultado.rol,'Token':token})
        } catch (err) {
            console.log(err);
            res.status(err.statusCode || 500).send({ error: err.message });
        }
    }

    async registrar (req, res, next){
        const registrar = req.body
        try {
            if (!registrar.Usuario || !registrar.Nombre || !registrar.Apellido || !registrar.Correo  || !registrar.Contrasena  || !registrar.ConfirmarContrasena) {
                throw new ErrorDetallado('Datos de entrada incorrecto o faltante',400)
            }
            const db = await usuarioModel.find({'correo':registrar.Correo});
            if (db.length != 0) {
                throw new ErrorDetallado('Correo ya esta en uso',404)
            }
            const salt =Number(process.env.salt) || await bcryptjs.genSalt(8)
            const encriptado = await bcryptjs.hash(registrar.Contrasena, salt)
            //rol
            let rol = 'cliente'
            if (registrar.AdminCheck == true) {
                if(registrar.AdminClave == 'admin'){
                    rol='admin'
                }else {
                    throw new ErrorDetallado('Clave Admin incorrecta', 401)
                }
            }
            const crear = {rol:rol,nombre:registrar.Nombre,apellido:registrar.Apellido,contrasena:encriptado,cedula:registrar.Cedula,correo:registrar.Correo, usuario:registrar.Usuario}
            await usuarioModel.create(crear)
            res.status(200).send({exito:'Creado correctamente'})
        } catch (err) {
            console.error(err);
            res.status(err.statusCode || 500).send({ error: err.message });
        }
    }

}

module.exports = new accederControllers();