var express = require('express');
const router = express.Router();

const propiedadController = require('../Controllers/propiedadController')

/**
 * @swagger
 * /propiedad:
 *   get:
 *     tags: [Propiedades]
 *     summary: Listar propiedades
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene todas las propiedades.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       500:
 *         description: Error del servidor
 */

router.get('/', propiedadController.listarPropiedades);

/**
 * @swagger
 * /propiedad/{id}:
 *   get:
 *     tags: [Propiedades]
 *     summary: Consultar propiedad
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene la información de una propiedad específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la propiedad a consultar.
 *         description: ID de la propiedad a consultar.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get("/:id", propiedadController.consultarPropiedad);

/**
 * @swagger
 * /propiedad/misProps/{id}:
 *   get:
 *     tags: [Propiedades]
 *     summary: Listar mis propiedades
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene todas las propiedades de un vendedor específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del vendedor cuyas propiedades se quieren consultar.
 *         description: ID del vendedor cuyas propiedades se quieren consultar.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get("/misProps/:id", propiedadController.misPropiedades);

/**
 * @swagger
 * /propiedad:
 *   post:
 *     tags: [Propiedades]
 *     summary: Insertar propiedad
 *     security:
 *       - BearerAuth: []
 *     description: Inserta una nueva propiedad.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropiedadInput'
 *     responses:
 *       200:
 *         description: Propiedad insertada exitosamente
 *       500:
 *         description: Error del servidor
 */

router.post("/", propiedadController.insertarPropiedad);

/**
 * @swagger
 * /propiedad/{id}:
 *   put:
 *     tags: [Propiedades]
 *     summary: Actualizar propiedad
 *     security:
 *       - BearerAuth: []
 *     description: Actualiza la información de una propiedad específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la propiedad a actualizar.
 *         description: ID de la propiedad a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropiedadInput'
 *     responses:
 *       200:
 *         description: Propiedad actualizada exitosamente
 *       500:
 *         description: Error del servidor
 */

router.put("/:id", propiedadController.actualizarPropiedad);

module.exports = router;