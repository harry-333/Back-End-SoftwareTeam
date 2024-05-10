
var connection = require('../Connection/index');

var agendaModel = {};

agendaModel.getAgendas = function (id, callback) {

    if (connection) {
        var sql = "SELECT id_agenda "
            + ", id_usuario "
            + ", comentarios "
            + ", fecha_hora "
            + ", id_propiedad "
            + " FROM agenda  "
            + "WHERE id_vendedor = " + connection.escape(id)
            + " ORDER BY id_agenda"


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
agendaModel.getAgenda = function (id, callback) {

    if (connection) {
        var sql = "SELECT id_agenda "
            + ", id_usuario "
            + ", comentarios "
            + ", fecha_hora "
            + ", id_propiedad "
            + " FROM agenda  "
            + " WHERE id_agenda  = "
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

agendaModel.getInformeProps = function (callback) {
    if (connection) {
        var sql = "SELECT id_propiedad, "
            + "desc_Neg,"
            + "titulo,"
            + "ciudad,"
            + "direccion,"
            + "precio,"
            + "No_habitaciones,"
            + "No_banos,"
            + "desc_Prop,"
            + "desc_tipoProp,"
            + "area_construida,"
            + "fecha_hora  "
            + "FROM agenda "
            + "NATURAL JOIN propiedad "
            + "NATURAL JOIN tipo_propiedad "
            + "NATURAL JOIN tipo_negocio "
            + "ORDER BY id_propiedad"


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

agendaModel.getInformeVends = function (callback) {
    if (connection) {
        var sql = "SELECT a.id_usuario,"
            + "u.nombre, "
            + "u.apellido, "
            + "u.descripcion, "
            + "a.fecha_hora, "
            + "a.comentarios,  "
            +"a.id_vendedor "
            + "FROM agenda a "
            + "INNER JOIN usuario u "
            + "ON a.id_usuario = u.id "
            + "ORDER BY id_usuario"


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
agendaModel.getInformeProp = function (tit, a1, a2, callback) {

    if (connection) {
        var sql = "SELECT id_propiedad ,"
            + "desc_Neg ,"
            + "titulo,"
            + "ciudad,"
            + "direccion,"
            + "precio ,"
            + "No_habitaciones ,"
            + "No_banos ,"
            + "desc_Prop ,"
            + "desc_tipoProp ,"
            + "area_construida,"
            + "fecha_hora  "
            + "FROM agenda "
            + "NATURAL JOIN propiedad  "
            + "NATURAL JOIN tipo_propiedad  "
            + "NATURAL JOIN tipo_negocio  "
            + "WHERE id_propiedad = " + connection.escape(tit)
            + "  AND fecha_hora BETWEEN " + connection.escape(a1)
            + "  AND " + connection.escape(a2) + ";";

        console.log(tit);

        connection.query(sql, function (error, rows) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                //callback(null, JSON.stringify(rows));
                callback(null, rows);
            }
        });
    }
}
//---------------------------------------------------------------

agendaModel.getInformeVend = function (vend, f1, f2, callback) {

    if (connection) {
        var sql = "SELECT a.id_usuario,"
            + "u.nombre, "
            + "u.apellido, "
            + "u.descripcion, "
            + "a.fecha_hora, "
            + "a.comentarios  "
            + "a.id_vendedor "
            + "FROM agenda a "
            + "INNER JOIN usuario u "
            + "ON a.id_usuario = u.id"
            + "WHERE a.id_vendedor = " + connection.escape(vend)
            + " AND a.fecha_hora BETWEEN " + connection.escape(f1)
            + " AND " + connection.escape(f2)

        console.log(vend);

        connection.query(sql, function (error, row) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                //callback(null, JSON.stringify(row));
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
agendaModel.insertAgenda = function (agendaData, callback) {
    if (connection) {
        //console.log(agendaData)
        var sql = "INSERT INTO agenda SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, agendaData, function (error, result) {
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
agendaModel.updateAgenda = function (agendaData, callback) {
    //console.log(" 32  tal  ");

    if (connection) {
        var sql = "UPDATE agenda SET"
            + " id_usuario = " + connection.escape(agendaData.id_usuario)
            + ", comentarios = " + connection.escape(agendaData.comentarios)
            + ", fecha_hora = " + connection.escape(agendaData.fecha_hora)
            + ", id_propiedad = " + connection.escape(agendaData.id_propiedad)
            + " WHERE id_agenda  =  " + connection.escape(agendaData.id_agenda) + ";";

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

module.exports = agendaModel;