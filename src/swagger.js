const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js']; // Path to your Express route files

const { SERVER_URL } = process.env

const doc = {
  info: {
    title: 'Megazin Server API', // Title of the API
    description: 'API documentation for News Service', // Description of the API
    version: '1.0.0', // Version of the API
    contact: {
      name: 'Alemayehu Mekonen', // Your name
      email: 'alemayehu.dev@gmail.com', // Your email address
      url: 'https://alemayehu.glitch.me', // Your website or GitHub profile
    },
  },
  host: SERVER_URL, // Replace with your server's hostname and port
  basePath: '/', // Optional: Base path of the API (e.g., /v1)
  schemes: ['http', 'https'], // Specify the protocol used by your API (http, https)
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation has been generated successfully');
});
