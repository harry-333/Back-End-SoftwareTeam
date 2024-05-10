// registroController.js

const usuarioModel = require('../Models/usuarioModel');

const registroController = {};

registroController.registrarUsuario = function (req, res) {
    const userData = req.body;
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

module.exports = registroController;
