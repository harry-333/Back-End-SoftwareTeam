var express = require('express');//guarda express que nosotros intalamos
var bodyParser = require('body-parser'), port = 3000;//rmanejo de cuerpo de la "pagina" y puerto
var http = require('http');//protocolo de intercambio de archivos
var path = require('path');//direccion

const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./configuration/swaggerConfig'); // Importa la configuración de Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

//rutas
const login = require('./src/Routes/loginRoutes');
const registro = require('./src/Routes/registroRoutes');

const usuario = require('./src/Routes/usuarioRoutes');
const propiedad = require('./src/Routes/propiedadRoutes');
const agenda = require('./src/Routes/agendaRoutes');
const tipoprop = require('./src/Routes/TipoPropRoutes');
const tiponeg = require('./src/Routes/TipoNegRoutes');

const resetPassword = require('./src/Routes/resetPasswordRoutes');
const profile = require('./src/Controllers/profileController');

const noAuth = require('./src/Routes/noAuthRoutes');
const auditoria = require('./src/Routes/auditoriaRoutes');

const authMiddleware = require('./src/middlewares/auth');

var app = express();//recibe un constructor

// todos los entornos
app.set('port', process.env.PORT || port);//metodo para recibir puerto y proceso
app.use(bodyParser.json({ type: 'application/json', limit: '10mb' }));//recibe un cuerpo y un objeto json
app.use(bodyParser.urlencoded({ extended: false }));//recibe url codificada
app.use(express.static(path.join(__dirname, 'public')));//recibe direccion

//=============================================Middlewares==========================================

//CORS

//app.use(cors());

/*
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
*/



// Configuración de CORS
app.use(cors({
    origin: '*', // Permite solo este origen
    credentials: true, // Permite cookies
    methods: '*',
    allowedHeaders: '*',
    exposedHeaders: '*',
    preflightContinue: true
}));



//CSRF
var csrfProtection = csrf({ cookie: true })
// We need cookie-parser to be initialized as well.
app.use(cookieParser())
app.get('/csrfEndpoint', csrfProtection, (req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false });
    res.status(200).send('CSRF token set');
});

//XSS Protection
app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});

// Configurar Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

//============================================================

//rutas para el servicio
/*
app.use('/tipdoc', authMiddleware, tipdoc());

*/
app.use('/usuario', authMiddleware, usuario);
app.use('/propiedad', authMiddleware, propiedad);
app.use('/agenda', authMiddleware, agenda);
app.use('/tipoprop', authMiddleware, tipoprop);
app.use('/tiponeg', authMiddleware, tiponeg);
app.use('/api', login);
app.use('/api', registro);
app.use('/api', resetPassword);
app.use('/profile', authMiddleware, profile);
app.use('/noAuth', noAuth);
app.use('/auditoria', authMiddleware, auditoria);

// Configurar Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));


http.createServer(app).listen(app.get('port'), function () {
    console.log('Servidor Express escuchando por el puerto ' + app.get('port'));
});

module.exports = app;
