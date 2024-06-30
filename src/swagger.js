const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js']; // Path to your Express route files

const doc = {
  info: {
    title: 'Megazin Server API', // Title of the API
    description: 'API documentation for News Service', // Description of the API
    version: '1.0.0', // Version of the API
  },
  host: 'localhost:9090', // Replace with your server's hostname and port
  basePath: '/', // Optional: Base path of the API (e.g., /v1)
  schemes: ['http'], // Specify the protocol used by your API (http, https)
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation has been generated successfully');
});
