// auditoriaRoutes.js

var express = require('express');
var router = express.Router();
var auditoriaController = require('../Controllers/auditoriaController');

/**
 * @swagger
 * tags:
 *   name: Auditoría
 *   description: Endpoints para la gestión de auditoría
 */

/**
 * @swagger
 * /auditoria:
 *   get:
 *     summary: Obtener todos los registros de auditoría
 *     security:
 *       - BearerAuth: []
 *     tags: [Auditoría]
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría
 *       500:
 *         description: Error del servidor
 */
router.get('/', auditoriaController.obtenerTodosRegistrosAuditoria);

/**
 * @swagger
 * /auditoria/filtrar-fecha-usuario:
 *   get:
 *     summary: Obtener registros de auditoría por fecha y/o usuario
 *     security:
 *       - BearerAuth: []
 *     tags: [Auditoría]
 *     parameters:
 *       - in: query
 *         name: fecha_hora
 *         schema:
 *           type: string
 *         description: Fecha y hora en formato YYYY-MM-DD HH:MM:SS
 *       - in: query
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría filtrados
 *       500:
 *         description: Error del servidor
 */
router.get('/filtrar-fecha-usuario', auditoriaController.obtenerRegistrosAuditoriaPorFechaHora);

/**
 * @swagger
 * /auditoria/buscar-palabra-clave:
 *   get:
 *     summary: Buscar registros de auditoría por palabra clave
 *     security:
 *       - BearerAuth: []
 *     tags: [Auditoría]
 *     parameters:
 *       - in: query
 *         name: palabraClave
 *         schema:
 *           type: string
 *         description: Palabra clave a buscar en la auditoría
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría que coinciden con la palabra clave
 *       500:
 *         description: Error del servidor
 */
router.get('/buscar-palabra-clave', auditoriaController.buscarPalabraClaveEnAuditoria);

module.exports = router;
