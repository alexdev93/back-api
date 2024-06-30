const express = require('express');
const newsRoutes = require('./controller/news.controller');
const authRoutes = require('./controller/auth.controller');
const userRoutes = require('./controller/user.controller');
const { sequelize } = require('./config/db');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://alexdev93.github.io',
];

const corsOptions = {
  // origin: (origin, callback) => {
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
const port = process.env.PORT || 9090;

app.use(express.json());

app.use('/api', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
