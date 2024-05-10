const express = require('express');
const router = express.Router();
const registroController = require('../Controllers/registroController');

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: [UsuarioNoLogueado]
 *     summary: Registrar usuario
 *     description: Registrar un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: NombreUsuario
 *               apellido:
 *                 type: string
 *                 example: ApellidoUsuario
 *               correo:
 *                 type: string
 *                 example: correo@gmail.com
 *               contrasena:
 *                 type: string
 *                 example: contraseña123
 *               telefono:
 *                 type: string
 *                 example: 1234567890
 *               descripcion:
 *                 type: string
 *                 example: prueba
 *               documento:
 *                 type: string
 *                 example: 1234567890
 *               tipo_documento:
 *                 type: string
 *                 example: DNI
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: El correo ya está en uso
 *       500:
 *         description: Error en el servidor
 */

router.post('/register', registroController.registrarUsuario);

module.exports = router;
