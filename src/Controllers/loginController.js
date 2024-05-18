const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usuarioModel = require('../Models/usuarioModel');
const speakeasy = require('speakeasy'); 
const CryptoJS = require('crypto-js');

const loginController = {};
const secretKey = 'udec';

loginController.login = async function (req, res) {
    try {
        const { correo, contrasena } = req.body;
        if (!correo || !contrasena) {
            res.status(400).send("Credenciales Incorrectas");
            return;
        }

        const decryptedPassword = decryptPassword(contrasena);
        console.log(decryptedPassword);
        
        usuarioModel.buscarUsuarioPorCorreo(correo, async function (error, results) {
            if (error) {
                console.log(error);
                res.status(500).send("Error del servidor");
                return;
            }

            if (results.length == 0) {
                res.status(400).send("Credenciales Incorrectas");
                return;
            }

            const hashComparacion = await bcrypt.compare(decryptedPassword, results[0].contrasena);
            if (!hashComparacion) {
                res.status(400).send("Credenciales Incorrectas");
                return;
            }

            const id = results[0].id;
            const id_rol = results[0].id_rol;
            const mfa_enabled = results[0].mfa_enabled;
            const token = jwt.sign({ id: id, email: correo, role_id: id_rol }, "loginSecret", { expiresIn: "2h" });
            res.status(200).json({ token, mfa_enabled });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor");
    }
};

function decryptPassword(encryptedPassword) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

loginController.validateOTP = async function (req, res) {
    try {
        const { id, token } = req.body;

        // Obtener la clave secreta del usuario desde la base de datos
        usuarioModel.obtenerClaveSecreta(id, function (error, result) {
            if (error) {
                console.error('Error al obtener clave secreta de la base de datos:', error);
                res.status(500).send("Error del servidor");
            } else {
                const base32_secret = result;

                // Verificar el token utilizando la clave secreta del usuario
                const tokenValido = speakeasy.totp.verify({
                    secret: base32_secret,
                    encoding: 'base32',
                    token: token,
                    window: 1
                });

                if (tokenValido) {
                    res.status(200).json({ mensaje: 'Código de verificación válido' });
                } else {
                    res.status(401).json({ mensaje: 'Código de verificación inválido' });
                }
            }
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send("Error del servidor");
    }
};

module.exports = loginController;