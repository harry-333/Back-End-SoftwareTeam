
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');

var usuarioModel = require('../Models/usuarioModel');

const secretKey = 'udec';

function decryptPassword(encryptedPassword) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    listarUsuarios : (req, res) => {
        usuarioModel.getUsuarios(function (error, data) {
            res.status(200).json(data);
        });
    },
    
    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el cliente solicitado
    consultarUsuario : (req, res) => {
        var id = req.params.id;
    
        //solo actualizamos si la id es un número
        if (!isNaN(id)) {
            usuarioModel.getUsuario(id, function (error, data) {
                //si el cliente existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else {
                    res.json(404,
                        {
                            "msg": "Registro no Existe"
                        });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "No es un número" });
        }
    },
    
    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    insertarUsuario : (req, res) => {
        //creamos un objeto Json con los datos del cliente
        var usuarioData =
        {
            id: null,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            telefono: req.body.telefono,
            descripcion: req.body.descripcion,
            documento: req.body.documento,
            tipo_documento: req.body.tipo_documento,
            id_rol: req.body.id_rol,
            mfa_enabled: 0
        };

        const decryptedPassword = decryptPassword(usuarioData.contrasena);    
    
        // Encriptamos la contraseña antes de almacenarla en la base de datos
        bcrypt.hash(decryptedPassword, 10, function (err, hash) {
            if (err) {
                res.status(500).send({ error: "Error al encriptar la contraseña" });
            } else {

                usuarioData.contrasena = hash; // Almacenamos la contraseña encriptada
                // Usamos la función para insertar
                usuarioModel.insertUsuario(usuarioData, function (error, data) {
                    // Se muestra el mensaje correspondiente
                    if (data) {
                        res.status(200).json(data);
                    } else {
                        res.status(500).send({ error: "Error al insertar el usuario" });
                    }
                });
            }
        });
    },
    
    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    actualizarUsuario : (req, res) => {
        //almacenamos los datos de la petición en un objeto
    
        var userId = req.params.id;
    
        var usuarioData =
        {
            id: userId,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            telefono: req.body.telefono,
            descripcion: req.body.descripcion,
            documento: req.body.documento,
            tipo_documento: req.body.tipo_documento,
            id_rol: req.body.id_rol,
        };
    
    
        //usamos la funcion para actualizar
        usuarioModel.updateUsuario(usuarioData, function (error, data) {
            //se muestra el mensaje correspondiente
            if (data && data.msg) {
                res.status(200).json(data);
            }
            else {
                res.status(500).send(
                    {
                        error: "boo:("
                    });
            }
        });
    }
}





