var auditoriaModel = require('../Models/auditoriaModel');

module.exports = {
    obtenerTodosRegistrosAuditoria: function(req, res) {
        auditoriaModel.obtenerTodosRegistrosAuditoria(function(error, data) {
            if (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.status(200).json(data[0]);
            }
        });
    },

    obtenerRegistrosAuditoriaPorFechaHora: function(req, res) {
        var fecha_hora = req.query.fecha_hora;
        var id_usuario = req.query.id_usuario;

        auditoriaModel.obtenerRegistrosAuditoriaPorFechaHora(fecha_hora, id_usuario, function(error, data) {
            if (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.status(200).json(data[0]);
            }
        });
    },

    buscarPalabraClaveEnAuditoria: function(req, res) {
        var palabraClave = req.query.palabraClave;

        auditoriaModel.buscarPalabraClaveEnAuditoria(palabraClave, function(error, data) {
            if (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.status(200).json(data[0]);
            }
        });
    }
};
