var express = require('express');
const router = express.Router();

const TipoNegController = require('../Controllers/TipoNegController');

/**
 * @swagger
 * /tiponeg:
 *   get:
 *     tags: [Tipo de Negocio]
 *     summary: Listar tipos de negocio
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene una lista de todos los tipos de negocio.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       500:
 *         description: Error del servidor
 */

router.get("/", TipoNegController.listarTipoNegs);

/**
 * @swagger
 * /tiponeg/{id}:
 *   get:
 *     tags: [Tipo de Negocio]
 *     summary: Consultar tipo de negocio
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene la información de un tipo de negocio específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de negocio a consultar.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get("/:id", TipoNegController.consultarTipoNeg);

/**
 * @swagger
 * /tiponeg:
 *   post:
 *     tags: [Tipo de Negocio]
 *     summary: Insertar tipo de negocio
 *     security:
 *       - BearerAuth: []
 *     description: Inserta un nuevo tipo de negocio.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc_Neg:
 *                 type: string
 *                 description: Descripción del tipo de negocio.
 *             required:
 *               - desc_Neg
 *     responses:
 *       200:
 *         description: Tipo de negocio insertado exitosamente
 *       500:
 *         description: Error del servidor
 */

router.post("/", TipoNegController.insertarTipoNeg);

/**
 * @swagger
 * /tiponeg/{id}:
 *   put:
 *     tags: [Tipo de Negocio]
 *     summary: Actualizar tipo de negocio
 *     description: Actualiza la información de un tipo de negocio específico.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de negocio a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc_Neg:
 *                 type: string
 *                 description: Nueva descripción del tipo de negocio.
 *             required:
 *               - desc_Neg
 *     responses:
 *       200:
 *         description: Tipo de negocio actualizado exitosamente
 *       500:
 *         description: Error del servidor
 */

router.put("/:id", TipoNegController.actualizarTipoNeg);

module.exports = router;