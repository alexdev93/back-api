const express = require('express');
const newsRoutes = require('./controller/news.controller');
const authRoutes = require('./controller/auth.controller');
const userRoutes = require('./controller/user.controller');
const houseRoutes = require('./controller/house.controller');
const { sequelize } = require('./config/db');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
require('dotenv').config();

const app = express();

const { SERVER_URL } = process.env;

const allowedOriginsString = process.env.ALLOWED_ORIGINS;
const allowedOrigins = allowedOriginsString.split(',');

const corsOptions = {
  // origin: (origin, callback) => {
  //   // Check if the origin is in the allowedOrigins array or if it's not defined (e.g., in case of same-origin requests)
  //   if (allowedOrigins.includes(origin) || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const port = process.env.PORT || 9090;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/newsImageDIR', express.static('newsImageDIR'));
app.use('/api', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on ${SERVER_URL}:${port}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
