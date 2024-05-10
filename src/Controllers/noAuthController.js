const propiedadModel = require('../Models/propiedadModel');

const noAuthController = {};

noAuthController.listarPropiedades = async (req, res) => {
    try {
        const propiedades = await propiedadModel.getPropiedadesNoAuth();
        res.status(200).json(propiedades);
    } catch (error) {
        console.error('Error al obtener las propiedades:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = noAuthController;
