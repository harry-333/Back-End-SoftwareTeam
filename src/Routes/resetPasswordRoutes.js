// resetPasswordRoutes.js

const express = require('express');
const router = express.Router();
const resetPasswordController = require('../Controllers/resetPasswordController');

/**
 * @swagger
 * /api/forget-password:
 *   post:
 *     tags: [UsuarioNoLogueado]
 *     summary: Olvido de contraseña
 *     description: Enviar un correo electrónico con un enlace para restablecer la contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: correo@gmail.com
 *     responses:
 *       200:
 *         description: Enlace de restablecimiento de contraseña enviado
 *       404:
 *         description: El correo no se encuentra en la base de datos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/forget-password', resetPasswordController.olvidoContraseña);

/**
 * @swagger
 * /api/reset-password/{token}:
 *   post:
 *     tags: [UsuarioNoLogueado]
 *     summary: Restablecer contraseña
 *     description: Restablecer la contraseña utilizando un token de restablecimiento.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token de restablecimiento de contraseña.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrasena:
 *                 type: string
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Contraseña restablecida con éxito
 *       400:
 *         description: Token no válido o ha expirado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/reset-password/:token', resetPasswordController.resetearContraseña);

module.exports = router;
