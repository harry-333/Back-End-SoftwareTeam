const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/loginController');

/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - UsuarioNoLogueado
 *     summary: Iniciar sesión 
 *     description: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo del usuario.
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       '200':
 *         description: Logueado con exito, devuelve un token de acceso
 *       '400':
 *         description: Credenciales incorrectas
 *       '500':
 *         description: Error de servidor
 */

router.post('/login', loginController.login);

router.post('/validateOTP', loginController.validateOTP);

module.exports = router;
