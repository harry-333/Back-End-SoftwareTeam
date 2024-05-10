const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/usuarioController');
const mfaController = require('../Controllers/mfaController');

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Listar usuarios
 *     description: Obtiene todos los usuarios.
 *     tags: [Usuario]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *       500:
 *         description: Error del servidor.
 */
router.get("/", usuarioController.listarUsuarios);

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Consultar usuario por ID
 *     description: Obtiene un usuario por su ID.
 *     tags: [Usuario]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario a consultar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos exitosamente.
 *       400:
 *         description: El ID proporcionado no es válido.
 *       404:
 *         description: El usuario no fue encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.get("/:id", usuarioController.consultarUsuario);

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Insertar nuevo usuario
 *     description: Inserta un nuevo usuario en la base de datos.
 *     tags: [Usuario]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuario insertado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error del servidor.
 */
router.post("/", usuarioController.insertarUsuario);

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     description: Actualiza los datos de un usuario existente.
 *     tags: [Usuario]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados o ID inválido.
 *       404:
 *         description: El usuario no fue encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.put("/:id", usuarioController.actualizarUsuario);

router.post("/2fa/:id", mfaController.habilitarMFA);

router.post("/verifyOTP", mfaController.verificarMFA);

router.post("/disabledOTP", mfaController.disabledOTP);


module.exports = router;
