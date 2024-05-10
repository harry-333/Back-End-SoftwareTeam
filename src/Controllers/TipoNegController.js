var express = require('express');
var router = express.Router();

var TipoNegModel = require('../Models/TipoNegModel');

module.exports = 
{
    listarTipoNegs: function(req, res)
    {
        TipoNegModel.getTipoNegs(function(error, data)
        {
            res.status(200).json(data);
        });
    },
    
   //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el tipo de negocio solicitado
    consultarTipoNeg: function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            TipoNegModel.getTipoNeg(id, function (error, data)
            {
                //si el tipo de negocio existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe" 
                    });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "No es un número" });
        }
    },

//---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    insertarTipoNeg: function (req, res)
    {
        //creamos un objeto Json con los datos del tipo de negocio
        var tipoNegData =
            {
                id_tipoNeg: null,
                desc_Neg: req.body.desc_Neg,
            };


        //usamos la funcion para insertar
        TipoNegModel.insertTipoNeg(tipoNegData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    },

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    actualizarTipoNeg: function (req, res)
    {
        //almacenamos los datos de la petición en un objeto
        var idTN = req.params.id;
        var tipoNegData =
            {
                id_tipoNeg: idTN,
                desc_Neg: req.body.desc_Neg,
            };


        //usamos la funcion para actualizar
        TipoNegModel.updateTipoNeg(tipoNegData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data && data.msg)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                { 
                    error: "boo:(" 
                });
            }
        });
    }
}
