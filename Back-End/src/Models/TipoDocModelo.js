var connection = require('../conexion/index');

var TipDocModel = {};

TipDocModel.getTipDocs = function(callback)
{

    if (connection)
    {
        var sql = "SELECT `id_tipodoc`, `desc_tipodoc`, `iniciales_tipdoc`" + 
                    " FROM `tipo_documento`" +
                    " ORDER BY `id_tipodoc`; ";

        connection.query(sql, function(error, rows)
        {
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        } );
    }

}

//---------------------------------------------------------------
//obtenemos un tipo doc por su id
TipDocModel.getTipDoc = function (id, callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_tipodoc "
                        +", desc_tipodoc "
                        +", iniciales_tipdoc "
                        +" FROM tipo_documento  "
                        +" WHERE id_tipodoc  = " 
                        + connection.escape(id) + ";";

        //console.log(id);
        //console.log(" 31  tal  " );
        connection.query(sql, function (error, row)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo tipo de documento
TipDocModel.insertTipDoc = function (TipDocData, callback)
{
    if (connection)
    {
        //console.log(TipDocData)
        var sql = "INSERT INTO tipo_documento SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, TipDocData, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado"});
            }
        });
    }
}


//---------------------------------------------------------------
//actualizar un tipo de documento
TipDocModel.updateTipDoc = function (TipDocData, callback)
 {
    //console.log(" 32  tal  ");

    if (connection)
    {
        var sql = "UPDATE tipo_documento SET "
                    + " desc_tipodoc = " + connection.escape(TipDocData.desc_tipodoc)
                    + ", iniciales_tipdoc = " + connection.escape(TipDocData.iniciales_tipdoc)
                    + " WHERE  id_tipodoc  =  " + connection.escape(TipDocData.id_tipodoc) + ";";
        
        ///console.log(" 37  tal  " + sql);

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }
}

module.exports = TipDocModel;