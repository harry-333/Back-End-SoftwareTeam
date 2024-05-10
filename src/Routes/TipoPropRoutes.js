var express = require('express');
const router = express.Router();

const TipoPropController = require('../Controllers/TipoPropController');

/**
 * @swagger
 * /tipoprop:
 *   get:
 *     tags: [Tipo de Propiedad]
 *     summary: Listar tipos de propiedad
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene una lista de todos los tipos de propiedad.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       500:
 *         description: Error del servidor
 */

router.get("/", TipoPropController.listarTipoProps);

/**
 * @swagger
 * /tipoprop/{id}:
 *   get:
 *     tags: [Tipo de Propiedad]
 *     summary: Consultar tipo de propiedad
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene la información de un tipo de propiedad específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de propiedad a consultar.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get("/:id", TipoPropController.consultarTipoProp);

/**
 * @swagger
 * /tipoprop:
 *   post:
 *     tags: [Tipo de Propiedad]
 *     summary: Insertar tipo de propiedad
 *     security:
 *       - BearerAuth: []
 *     description: Inserta un nuevo tipo de propiedad.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc_tipoProp:
 *                 type: string
 *                 description: Descripción del tipo de propiedad.
 *             required:
 *               - desc_tipoProp
 *     responses:
 *       200:
 *         description: Tipo de propiedad insertado exitosamente
 *       500:
 *         description: Error del servidor
 */

router.post("/", TipoPropController.insertarTipoProp);

/**
 * @swagger
 * /tipoprop/{id}:
 *   put:
 *     tags: [Tipo de Propiedad]
 *     summary: Actualizar tipo de propiedad
 *     security:
 *       - BearerAuth: []
 *     description: Actualiza la información de un tipo de propiedad específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de propiedad a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc_tipoProp:
 *                 type: string
 *                 description: Nueva descripción del tipo de propiedad.
 *             required:
 *               - desc_tipoProp
 *     responses:
 *       200:
 *         description: Tipo de propiedad actualizado exitosamente
 *       500:
 *         description: Error del servidor
 */

router.put("/:id", TipoPropController.actualizarTipoProp);

module.exports = router;