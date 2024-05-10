const speakeasy = require('speakeasy'); // Módulo para trabajar con TOTP
const usuarioModel = require('../Models/usuarioModel');

const mfaController = {};

// Función para generar una nueva clave secreta TOTP
const generarClaveSecreta = () => {
    return speakeasy.generateSecret({ length: 20 }); // Genera una clave secreta de 20 caracteres
};

// Función para generar la URL del código QR
const generarURLCodigoQR = (base32_secret, usuario_id) => {
    const otpauth_url = speakeasy.otpauthURL({
        secret: base32_secret,
        label: 'SoftwareTeamAuth', // Nombre que se mostrará en Google Authenticator
        issuer: 'SoftwareTeam', // Nombre de la aplicación
        encoding: 'base32'
    });

    return otpauth_url;
};



mfaController.habilitarMFA = async function (req, res) {
    try {
        var id = req.params.id

        // Generar una nueva clave secreta para el usuario
        const secret = generarClaveSecreta().base32;

        // Generar la URL para el código QR
        const qrCodeUrl = generarURLCodigoQR(secret, id);

        console.log(qrCodeUrl);

        // Guardar la clave secreta en la base de datos para el usuario
        usuarioModel.guardarClaveSecreta(id, secret, function (error, result) {
            if (error) {
                console.error('Error al guardar clave secreta en la base de datos:', error);
                res.status(500).send("Error del servidor");
            } else {
                // Devolver la clave secreta y el código QR al usuario
                
                res.status(200).json({ secret: secret, qrCode: qrCodeUrl });
            }
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send("Error del servidor");
    }
};

mfaController.verificarMFA = async function (req, res) {
    try {
        const { id, token } = req.body;
        console.log(id, token);

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
                    window: 1 // Ventana de tiempo permitida para verificar el código (1 segundo de desfase)
                });
                console.log(base32_secret);
                console.log(tokenValido);

                if (tokenValido) {
                    // Actualizar en la base de datos que la autenticación de dos factores está habilitada y verificada
                    usuarioModel.actualizarMFA(id, function (error, result) {
                        if (error) {
                            console.error('Error al actualizar la autenticación de dos factores en la base de datos:', error);
                            res.status(500).send("Error del servidor");
                        } else {
                            res.status(200).json({ mensaje: 'Autenticación de dos factores habilitada y verificada correctamente' });
                        }
                    });
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

mfaController.validateOTP = async function (req, res) {
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

mfaController.disabledOTP = async function (req, res) {
    try {
        const { id } = req.body;
        
        // Actualizar en la base de datos que la autenticación de dos factores está deshabilitada
        usuarioModel.deshabilitarMFA(id, function (error, result) {
            if (error) {
                console.error('Error al deshabilitar la autenticación de dos factores en la base de datos:', error);
                res.status(500).send("Error del servidor");
            } else {
                res.status(200).json({ mensaje: 'Autenticación de dos factores deshabilitada correctamente' });
            }
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send("Error del servidor");
    }
};

module.exports = mfaController;
