const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  try {
    // Obtiene el token desde el encabezado de autorización
    const token = request.headers.authorization.split(" ")[1];

    // Verifica si el token coincide con el origen supuesto
    const decodedToken = jwt.verify(token, "loginSecret");

    // Pasa los detalles del usuario autenticado a las rutas
    request.userData = decodedToken;

    // Pasa la funcionalidad a la siguiente capa de middleware (o a las rutas)
    next();
  } catch (error) {
    return response.status(401).json({
      message: "Autenticación fallida"
    });
  }
};
