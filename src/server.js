require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));

server.use('/api', routes);

// Configurando Swagger
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'API de Cadastro',
        description: 'API para gerenciamento de cadastros',
        version: '1.0.0',
      },
    },
    apis: ['./controllers/*.js'], // Seus controladores ou rotas que contêm as anotações JSDoc
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});