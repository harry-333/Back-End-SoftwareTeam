const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usuarioModel = require('../Models/usuarioModel');
const resetPasswordController = {};

// Configura el transporte para enviar correos
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bajistamar@gmail.com',
        pass: 'txjt poqu uozk cufe',
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function enviarCorreoRestablecimiento(email, token) {
    const resetLink = `http://localhost:4200/public/change-password/${token}`;
    const mailOptions = {
        from: '',
        to: email,
        subject: 'Restablecimiento de contraseña',
        text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (emailError, info) => {
            if (emailError) {
                console.error(emailError);
                reject('Error al enviar el correo');
            } else {
                console.log('Correo enviado: ' + info.response);
                resolve('Enlace de restablecimiento de contraseña enviado');
            }
        });
    });
}

resetPasswordController.olvidoContraseña = async function(req, res) {
    try {
        const { correo } = req.body;
        console.log(correo);

        const usuario = await usuarioModel.verificarCorreo(correo);

        const token = jwt.sign({ id: usuario.id, email: correo }, "resetPass", { expiresIn: "10m" });

        await enviarCorreoRestablecimiento(correo, token);

        res.status(200).json({ message: 'Enlace de restablecimiento de contraseña enviado' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
}

resetPasswordController.resetearContraseña = async function(req, res) {
    try {
        const { token } = req.params;
        const { contrasena } = req.body;

        console.log(token, contrasena);

        jwt.verify(token, 'resetPass', async (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(400).send('Token no válido o ha expirado');
            }

            const email = decoded.email;

            const hashedPassword = await bcrypt.hash(contrasena, 10);

            await usuarioModel.actualizarContraseña(email, hashedPassword);

            res.status(200).send('Contraseña restablecida con éxito');
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = resetPasswordController;