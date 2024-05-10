var conexion = require('../Connection/index');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//Ruta para actualizar informacion basica del usuario
router.post('/:id', async (req, res) => {
    try{

        var userId = req.params.id;

        var usuarioData =
        {
            id: userId,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            telefono: req.body.telefono,
            descripcion: req.body.descripcion,
            documento: req.body.documento,
            tipo_documento: req.body.tipo_documento,
        };

        // Realizar la actualización en la base de datos
        await conexion.query(
            `UPDATE usuario SET ? WHERE id = ?`,
            [usuarioData, userId],
            (error, results) => {
                if (error) {
                    console.error('Error al actualizar la información básica del usuario:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    res.status(200).json({ message: 'Información básica actualizada con éxito' });
                }
            }
        );

    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

//Ruta para actualizar contraseña del usuario
router.post('/password/:id', async (req, res) => {
    try{

        const userId = req.params.id;
        const nuevaContrasena = req.body.contrasena;


        // Encriptar la nueva contraseña con Bcrypt
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

        // Actualizar la contraseña en la base de datos
        await conexion.query(
            `UPDATE usuario SET contrasena = ? WHERE id = ?`,
            [hashedPassword, userId],
            (error, results) => {
                if (error) {
                    console.error('Error al actualizar la contraseña del usuario:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    res.status(200).json({ message: 'Contraseña actualizada con éxito' });
                }
            }
        );

    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

module.exports = router;