var connection = require('../Connection/index');

var TipoPropModel = {};

TipoPropModel.getTipoProps = function (callback) {

    if (connection) {
        var sql = "SELECT id_tipoProp "
            + ", desc_tipoProp "
            + " FROM tipo_propiedad  "
            + " ORDER BY id_tipoProp"


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
//obtenemos un tipo de propiedad por su id
TipoPropModel.getTipoProp = function (id, callback) {

    if (connection) {
        var sql = "SELECT id_tipoProp "
        + ", desc_tipoProp "
        + " FROM tipo_propiedad  "
            + " WHERE id_tipoProp  = "
            + connection.escape(id) + ";";

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
//añadir un nuevo tipo de propiedad
TipoPropModel.insertTipoProp = function (tipoPropData, callback) {
    if (connection) {
        //console.log(tipoPropData)
        var sql = "INSERT INTO tipo_propiedad SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, tipoPropData, function (error, result) {
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
//actualizar un tipo de propiedad
TipoPropModel.updateTipoProp = function (tipoPropData, callback) {
    //console.log(" 32  tal  ");

    if (connection) {
        var sql = "UPDATE tipo_propiedad SET "
            + " desc_tipoProp = " + connection.escape(tipoPropData.desc_tipoProp)
            + " WHERE  id_tipoProp  =  " + connection.escape(tipoPropData.id_tipoProp) + ";";

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

module.exports = TipoPropModel;