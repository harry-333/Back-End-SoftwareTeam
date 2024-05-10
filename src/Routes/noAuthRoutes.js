const express = require('express');
const router = express.Router();
const noAuthController = require('../Controllers/noAuthController');

/**
 * @swagger
 * /noAuth:
 *   get:
 *     tags: [UsuarioNoLogueado]
 *     summary: Obtener todas las propiedades
 *     description: Obtiene todas las propiedades almacenadas en la base de datos.
 *     responses:
 *       200:
 *         description: Listado de propiedades obtenido con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', noAuthController.listarPropiedades);

module.exports = router;
