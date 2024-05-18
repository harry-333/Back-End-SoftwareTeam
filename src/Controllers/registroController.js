const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');
const usuarioModel = require('../Models/usuarioModel');

const registroController = {};

const secretKey = 'udec';

registroController.registrarUsuario = function (req, res) {
    const userData = req.body;
    userData.contrasena = decryptPassword(userData.contrasena);
    
    usuarioModel.registrarUsuario(userData, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            if (result.error) {
                res.status(400).json({ error: result.error });
            } else {
                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            }
        }
    });
};

function decryptPassword(encryptedPassword) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = registroController;
