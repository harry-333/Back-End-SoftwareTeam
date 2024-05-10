var express = require('express');
var router = express.Router();

var TipoPropModel = require('../Models/TipoPropModel');

module.exports = 
{
    listarTipoProps: function(req, res)
    {
        TipoPropModel.getTipoProps(function(error, data)
        {
            res.status(200).json(data);
        });
    },
    
   //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el tipo de propiedad solicitado
    consultarTipoProp: function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            TipoPropModel.getTipoProp(id, function (error, data)
            {
                //si el tipo de propiedad existe lo mostramos en formato json
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
    insertarTipoProp: function (req, res)
    {
        //creamos un objeto Json con los datos del tipo de propiedad
        var tipoPropData =
            {
                id_tipoProp: null,
                desc_tipoProp: req.body.desc_tipoProp,
            };


        //usamos la funcion para insertar
        TipoPropModel.insertTipoProp(tipoPropData, function (error, data)
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
    actualizarTipoProp: function (req, res)
    {
        //almacenamos los datos de la petición en un objeto
        var idTP = req.params.id;
        var tipoPropData =
            {
                id_tipoProp: idTP,
                desc_tipoProp: req.body.desc_tipoProp,
            };


        //usamos la funcion para actualizar
        TipoPropModel.updateTipoProp(tipoPropData, function (error, data)
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
