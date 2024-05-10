var connection = require('../Connection/index');

var propiedadModel = {};

propiedadModel.getPropiedades = function (callback) {

    if (connection) {
        var sql = "SELECT id_propiedad "
            + ", id_tipoNeg "
            + ", titulo "
            + ", ciudad "
            + ", direccion "
            + ", precio "
            + ", No_habitaciones "
            + ", No_banos "
            + ", desc_prop "
            + ", id_tipoProp "
            + ", area_construida "
            + ", id_vendedor"
            + " FROM propiedad  "
            + " ORDER BY precio DESC"


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
//obtenemos una propiedad por su id
propiedadModel.getPropiedad = function (id, callback) {
    if (connection) {
        var sql = "SELECT p.id_propiedad, "
            + "p.id_tipoNeg, "
            + "p.titulo, "
            + "p.ciudad, "
            + "p.direccion, "
            + "p.precio, "
            + "p.No_habitaciones, "
            + "p.No_banos, "
            + "p.desc_prop, "
            + "p.id_tipoProp, "
            + "p.area_construida, "
            + "p.id_vendedor, "
            + "u.nombre AS nombre_vendedor, "
            + "u.apellido AS apellido_vendedor , "
            + "u.correo AS email_vendedor, "
            + "u.telefono "
            + "FROM propiedad p "
            + "LEFT JOIN usuario u ON p.id_vendedor = u.id "
            + "WHERE p.id_propiedad = " + connection.escape(id) + ";";

        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

propiedadModel.getMisPropiedades = function (id, callback) {
    if (connection) {
        var sql = "SELECT p.id_propiedad, "
            + "p.id_tipoNeg, "
            + "p.titulo, "
            + "p.ciudad, "
            + "p.direccion, "
            + "p.precio, "
            + "p.No_habitaciones, "
            + "p.No_banos, "
            + "p.desc_prop, "
            + "p.id_tipoProp, "
            + "p.area_construida, "
            + "p.id_vendedor, "
            + "u.nombre AS nombre_vendedor, "
            + "u.apellido AS apellido_vendedor , "
            + "u.correo AS email_vendedor, "
            + "u.telefono "
            + "FROM propiedad p "
            + "LEFT JOIN usuario u ON p.id_vendedor = u.id "
            + "WHERE p.id_vendedor = " + connection.escape(id) + ";";

        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}


//---------------------------------------------------------------
//añadir una nueva propiedad
propiedadModel.insertPropiedad = function (propiedadData, callback) {
    if (connection) {
        //console.log(propiedadData)
        var sql = "INSERT INTO propiedad SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, propiedadData, function (error, result) {
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
//actualizar una propiedad
propiedadModel.updatePropiedad = function (propiedadData, callback) {
    //console.log(" 32  tal  ");

    if (connection) {
        var sql = "UPDATE propiedad SET "
            + " id_tipoNeg = " + connection.escape(propiedadData.id_tipoNeg)
            + ", titulo = " + connection.escape(propiedadData.titulo)
            + ", ciudad = " + connection.escape(propiedadData.ciudad)
            + ", direccion = " + connection.escape(propiedadData.direccion)
            + ", precio = " + connection.escape(propiedadData.precio)
            + ", No_habitaciones = " + connection.escape(propiedadData.No_habitaciones)
            + ", No_banos = " + connection.escape(propiedadData.No_banos)
            + ", desc_prop = " + connection.escape(propiedadData.desc_prop)
            + ", id_tipoProp = " + connection.escape(propiedadData.id_tipoProp)
            + ", area_construida = " + connection.escape(propiedadData.area_construida)
            + " WHERE  id_propiedad  =  " + connection.escape(propiedadData.id_propiedad) + ";";

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

propiedadModel.getPropiedadesNoAuth = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT id_propiedad "
            + ", id_tipoNeg "
            + ", titulo "
            + ", ciudad "
            + ", direccion "
            + ", precio "
            + ", No_habitaciones "
            + ", No_banos "
            + ", desc_prop "
            + ", id_tipoProp "
            + ", area_construida "
            + ", id_vendedor"
            + " FROM propiedad  "
            + " ORDER BY precio DESC";
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = propiedadModel;