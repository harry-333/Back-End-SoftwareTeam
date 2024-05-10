var connection = require('../Connection/index');

var TipoNegModel = {};

TipoNegModel.getTipoNegs = function (callback) {

    if (connection) {
        var sql = "SELECT id_tipoNeg "
            + ", desc_Neg "
            + " FROM tipo_negocio  "
            + " ORDER BY id_tipoNeg"


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
//obtenemos un tipo de negocio por su id
TipoNegModel.getTipoNeg = function (id, callback) {

    if (connection) {
        var sql = "SELECT id_tipoNeg "
            + ", desc_Neg "
            + " FROM tipo_negocio  "
            + " WHERE id_tipoNeg  = " + connection.escape(id) + ";";

        //console.log(id);
        //console.log(" 31  tal  " );
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
//añadir un nuevo tipo de negocio
TipoNegModel.insertTipoNeg = function (tipoNegData, callback) {
    if (connection) {
        //console.log(tipoNegData)
        var sql = "INSERT INTO tipo_negocio SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, tipoNegData, function (error, result) {
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
//actualizar un tipo de negocio
TipoNegModel.updateTipoNeg = function (tipoNegData, callback) {
    //console.log(" 32  tal  ");

    if (connection) {
        var sql = "UPDATE tipo_negocio SET "
            + " desc_Neg = " + connection.escape(tipoNegData.desc_Neg)
            + " WHERE  id_tipoNeg  =  " + connection.escape(tipoNegData.id_tipoNeg) + ";";

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

module.exports = TipoNegModel;