const path = require('path');

const swaggerSpec = {

  definition: {
    openapi: "3.0.0",
    info: {
      title: 'API Software Team',
      version: '1.0.0',
      description: 'Control de Inmobiliarias de Citas',
    },

    servers: [
      {
        url: "https://back-end-softwareteam.onrender.com",
        description: "Server deploy in Render"
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
        },
      },
      schemas: {

        UsuarioInput: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del usuario.',
              example: 'Juan'
            },
            apellido: {
              type: 'string',
              description: 'Apellido del usuario.',
              example: 'Pérez'
            },
            correo: {
              type: 'string',
              description: 'Correo electrónico del usuario.',
              example: 'usuario@example.com'
            },
            contrasena: {
              type: 'string',
              description: 'Contraseña del usuario.',
              example: 'contraseña123'
            },
            telefono: {
              type: 'string',
              description: 'Número de teléfono del usuario.',
              example: '1234567890'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción del usuario.',
              example: 'Descripción del usuario'
            },
            documento: {
              type: 'string',
              description: 'Número de documento del usuario.',
              example: '123456789'
            },
            tipo_documento: {
              type: 'integer',
              description: 'Tipo de documento del usuario.',
              example: '1'
            },
            id_rol: {
              type: 'integer',
              description: 'Rol de usuario en el sistema',
              example: '1'
            }
          },
        },

        PropiedadInput: {
          type: 'object',
          properties: {
            id_tipoNeg: {
              type: 'integer',
              description: 'ID del tipo de negocio.',
              example: 1
            },
            titulo: {
              type: 'string',
              description: 'Título de la propiedad.',
              example: 'Casa en venta'
            },
            ciudad: {
              type: 'string',
              description: 'Ciudad de la propiedad.',
              example: 'Bogotá'
            },
            direccion: {
              type: 'string',
              description: 'Dirección de la propiedad.',
              example: 'Calle 123 #456'
            },
            precio: {
              type: 'number',
              description: 'Precio de la propiedad.',
              example: 1000000
            },
            No_habitaciones: {
              type: 'integer',
              description: 'Número de habitaciones de la propiedad.',
              example: 3
            },
            No_banos: {
              type: 'integer',
              description: 'Número de baños de la propiedad.',
              example: 2
            },
            desc_prop: {
              type: 'string',
              description: 'Descripción de la propiedad.',
              example: 'Hermosa casa con jardín.'
            },
            id_tipoProp: {
              type: 'integer',
              description: 'ID del tipo de propiedad.',
              example: 1
            },
            area_construida: {
              type: 'number',
              description: 'Área construida de la propiedad.',
              example: 150.5
            },
            id_vendedor: {
              type: 'integer',
              description: 'ID del vendedor de la propiedad.',
              example: 1
            }
          }
        },

        AgendaInput: {
          type: 'object',
          properties: {
            id_usuario: {
              type: 'integer',
              description: 'ID del usuario asociado a la agenda.',
              example: 1
            },
            comentarios: {
              type: 'string',
              description: 'Comentarios relacionados con la agenda.',
              example: 'Reunión con cliente'
            },
            fecha_hora: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de la agenda.',
              example: '2024-03-25T10:30:00Z'
            },
            id_propiedad: {
              type: 'integer',
              description: 'ID de la propiedad asociada a la agenda.',
              example: 1
            },
            id_vendedor: {
              type: 'integer',
              description: 'ID del vendedor asociado a la agenda.',
              example: 1
            }
          }
        },

      },
    },
  },
  apis: [
    './src/Routes/loginRoutes.js',
    './src/Routes/usuarioRoutes.js',
    './src/Routes/registroRoutes.js',
    './src/Routes/resetPasswordRoutes.js',
    './src/Routes/noAuthRoutes.js',
    './src/Routes/propiedadRoutes.js',
    './src/Routes/agendaRoutes.js',
    './src/Routes/TipoPropRoutes.js',
    './src/Routes/TipoNegRoutes.js',
    './src/Routes/auditoriaRoutes.js',
  ], // Ruta al archivo de rutas de los módulos

};

module.exports = swaggerSpec;
