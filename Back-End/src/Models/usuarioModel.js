var connection = require('../Connection/index');
const bcrypt = require('bcrypt');

var usuarioModel = {};

//---------------------------------------------------------------
//Se obtiene toda la lista de usuarios
usuarioModel.getUsuarios = function (callback) {

    if (connection) {
        var sql = "SELECT u.id "
            + ", u.nombre "
            + ", u.apellido "
            + ", u.correo "
            + ", u.telefono "
            + ", u.descripcion "
            + ", u.documento "
            + ", u.tipo_documento "
            + ", u.id_rol "
            + ", r.descripcion AS " + "Rol"
            + " FROM usuario u INNER JOIN rol r ON u.id_rol = r.id"
            + " ORDER BY u.id"


        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }

}

//---------------------------------------------------------------
//obtenemos un usuario por su id
usuarioModel.getUsuario = function (id, callback) {

    if (connection) {
        var sql = "SELECT u.id "
            + ", u.nombre "
            + ", u.apellido "
            + ", u.correo "
            + ", u.telefono "
            + ", u.descripcion "
            + ", u.documento "
            + ", u.tipo_documento "
            + ", u.id_rol "
            + ", u.mfa_enabled"
            + ", r.descripcion AS " + "Rol"
            + " FROM usuario u INNER JOIN rol r ON u.id_rol = r.id"
            + " WHERE u.id  = " + connection.escape(id) + ";";

        connection.query(sql, function (error, row) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo usuario

usuarioModel.insertUsuario = function (usuarioData, callback) {
    if (connection) {
        //console.log(usuarioData)
        var sql = "INSERT INTO usuario SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, usuarioData, function (error, result) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}


//---------------------------------------------------------------
//actualizar un usuario

usuarioModel.updateUsuario = function (usuarioData, callback) {
    //console.log(" 32  tal  ");

    if (connection) {
        var sql = "UPDATE usuario SET "
            + " nombre = " + connection.escape(usuarioData.nombre)
            + ", apellido = " + connection.escape(usuarioData.apellido)
            + ", correo = " + connection.escape(usuarioData.correo)
            + ", telefono = " + connection.escape(usuarioData.telefono)
            + ", descripcion = " + connection.escape(usuarioData.descripcion)
            + ", documento = " + connection.escape(usuarioData.documento)
            + ", tipo_documento = " + connection.escape(usuarioData.tipo_documento)
            + ", id_rol = " + connection.escape(usuarioData.id_rol)
            + " WHERE id  =  " + connection.escape(usuarioData.id) + ";";

        ///console.log(" 37  tal  " + sql);

        connection.query(sql, function (error, result) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Actualizado" });
            }
        });
    }
}

usuarioModel.buscarUsuarioPorCorreo = function (correo, callback) {
    var sql = `SELECT * FROM usuario WHERE correo = ?`;
    connection.query(sql, [correo], function (error, results) {
        callback(error, results);
    });
};

usuarioModel.registrarUsuario = function (userData, callback) {
    if (connection) {
        // Desestructuramos los datos del usuario
        const {
            nombre,
            apellido,
            correo,
            contrasena,
            telefono,
            descripcion,
            documento,
            tipo_documento
        } = userData;

        // Verificar si el correo ya está en uso
        const correoExistenteQuery = `SELECT * FROM usuario WHERE correo = ?`;
        connection.query(correoExistenteQuery, [correo], async (error, results) => {
            if (error) {
                return callback(error);
            }

            if (results.length > 0) {
                return callback(null, { error: 'El correo ya está en uso' });
            } else {
                // Encriptar la contraseña con bcrypt
                const hashedPassword = await bcrypt.hash(contrasena, 10); // 10 es el número de rondas de hashing

                // Insertar el nuevo usuario en la base de datos
                const insertUserQuery = `INSERT INTO usuario (id_rol, nombre, apellido, correo, contrasena, telefono, descripcion, documento, tipo_documento, mfa_enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                connection.query(insertUserQuery, [3, nombre, apellido, correo, hashedPassword, telefono, descripcion, documento, tipo_documento, 0], (error, result) => {
                    if (error) {
                        return callback(error);
                    }

                    return callback(null, { message: 'Usuario registrado exitosamente' });
                });
            }
        });
    }
};

usuarioModel.verificarCorreo = async function (correo) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usuario WHERE correo = ?', [correo], (error, results) => {
            if (error) {
                console.error(error);
                reject('Error en la consulta de la base de datos');
            } else if (results.length === 0) {
                reject('El correo no se encuentra en la base de datos');
            } else {
                resolve(results[0]);
            }
        });
    });
};

usuarioModel.actualizarContraseña = async function (email, hashedPassword) {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE usuario SET contrasena = ? WHERE correo = ?', [hashedPassword, email], (error, result) => {
            if (error) {
                console.error(error);
                reject('Error al cambiar la contraseña');
            } else {
                resolve('Contraseña restablecida con éxito');
            }
        });
    });
}

usuarioModel.guardarClaveSecreta = async function (usuarioId, secret, callback) {
    if (connection) {
        const sql = 'UPDATE usuario SET mfa_secret = ? WHERE id = ?';
        
        connection.query(sql, [secret, usuarioId], function (error, result) {
            if (error) {
                callback(error);
            } else {
                callback(null, result);
            }
        });
    }
};

usuarioModel.obtenerClaveSecreta = async function (usuarioId, callback) {
    if (connection) {
        const sql = 'SELECT mfa_secret FROM usuario WHERE id = ?';
        connection.query(sql, [usuarioId], function (error, result) {
            if (error) {
                callback(error);
            } else {
                // Obtener la clave secreta del primer resultado (si existe)
                const base32_secret = result.length > 0 ? result[0].mfa_secret : null;
                callback(null, base32_secret);
            }
        });
    }
};

usuarioModel.actualizarMFA = async function (usuarioId, callback) {
    if (connection) {
        const sql = 'UPDATE usuario SET mfa_enabled = 1 WHERE id = ?';
        connection.query(sql, [usuarioId], function (error, result) {
            if (error) {
                callback(error);
            } else {
                callback(null, result);
            }
        });
    }
};

usuarioModel.deshabilitarMFA = async (id, callback) => {

    if (connection) {
        console.log(id);
        // Realiza la consulta para actualizar el usuario y deshabilitar la autenticación de dos factores
        const sql = 'UPDATE usuario SET mfa_enabled = 0 WHERE id = ?';
        connection.query(sql, [id], (error, result) => {
            if (error) {
                
                callback(error, null);
            } else {
                
                callback(null, result);
            }
        });
    }
};

module.exports = usuarioModel;