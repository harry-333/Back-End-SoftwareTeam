var express = require('express');
const router = express.Router();

const agendaController = require('../Controllers/agendaController')

/**
 * @swagger
 * /agenda/misAgendas/{id}:
 *   get:
 *     tags: [Agenda]
 *     summary: Mis agendas
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene las agendas asociadas al usuario de rol vendedor.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       500:
 *         description: Error del servidor
 */

router.get("/misAgendas/:id", agendaController.misAgendas);

/**
 * @swagger
 * /agenda:
 *   post:
 *     tags: [Agenda]
 *     summary: Insertar agenda
 *     security:
 *       - BearerAuth: []
 *     description: Inserta una nueva agenda.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgendaInput'
 *     responses:
 *       200:
 *         description: Agenda insertada exitosamente
 *       500:
 *         description: Error del servidor
 */

router.post("/", agendaController.insertarAgenda);


/**
 * @swagger
 * /agenda/{id}:
 *   put:
 *     tags: [Agenda]
 *     summary: Actualizar agenda
 *     security:
 *       - BearerAuth: []
 *     description: Actualiza la información de una agenda específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la agenda a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgendaInput'
 *     responses:
 *       200:
 *         description: Agenda actualizada exitosamente
 *       500:
 *         description: Error del servidor
 */

router.put("/:id", agendaController.actualizarAgenda);

/**
 * @swagger
 * /agenda/informePropiedades:
 *   get:
 *     tags: [Agenda]
 *     summary: Informe propiedades
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene un informe completo sobre las propiedades asociadas a las agendas.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       500:
 *         description: Error del servidor
 */

router.get("/informePropiedades", agendaController.informeProps);

/**
 * @swagger
 * /agenda/informeVendedores:
 *   get:
 *     tags: [Agenda]
 *     summary: Informe vendedores
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene un informe completo sobre los vendedores asociados a las agendas.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       500:
 *         description: Error del servidor
 */

router.get("/informeVendedores", agendaController.informeVendedores);

/**
 * @swagger
 * /agenda/{id}:
 *   get:
 *     tags: [Agenda]
 *     summary: Consultar agenda
 *     security:
 *       - BearerAuth: []
 *     description: Obtiene la información de una agenda específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la agenda a consultar.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get("/:id", agendaController.consultarAgenda);


/**
 * @swagger
 * /agenda/informePropiedad/{tit}/{a1}/{a2}:
 *   get:
 *     tags: [Agenda]
 *     summary: Informe por propiedad y período de tiempo
 *     security:
 *       - BearerAuth: [] 
 *     description: Obtiene un informe sobre las agendas asociadas a una propiedad específica en un período de tiempo determinado.
 *     parameters:
 *       - in: path
 *         name: tit
 *         required: true
 *         schema:
 *           type: string
 *         description: Título de la propiedad.
 *       - in: path
 *         name: a1
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de inicio del período de tiempo en formato ISO 8601.
 *       - in: path
 *         name: a2
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de fin del período de tiempo en formato ISO 8601.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get("/informePropiedad/:tit/:a1/:a2", agendaController.informePropiedad);

/**
 * @swagger
 * /agenda/informeVendedor/{vend}/{f1}/{f2}:
 *   get:
 *     tags: [Agenda]
 *     summary: Informe por vendedor y período de tiempo
 *     description: Obtiene un informe sobre las agendas asociadas a un vendedor específico en un período de tiempo determinado.
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: vend
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor.
 *       - in: path
 *         name: f1
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de inicio del período de tiempo en formato ISO 8601.
 *       - in: path
 *         name: f2
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de fin del período de tiempo en formato ISO 8601.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get("/informeVendedor/:vend/:f1/:f2", agendaController.informeVendedor);

module.exports = router;