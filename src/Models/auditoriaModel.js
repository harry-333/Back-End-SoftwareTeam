var conexion = require('../Connection/index');

module.exports = {
    obtenerTodosRegistrosAuditoria: function(callback) {
        conexion.query('CALL obtener_todos_registros_auditoria()', callback);
    },

    obtenerRegistrosAuditoriaPorFechaHora: function(fecha_hora, id_usuario, callback) {
        conexion.query('CALL obtener_registros_auditoria_por_fecha_usuario(?, ?)', [fecha_hora, id_usuario], callback);
    },

    buscarPalabraClaveEnAuditoria: function(palabraClave, callback) {
        conexion.query('CALL buscar_palabra_clave_en_auditoria(?)', [palabraClave], callback);
    }
};
