const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const routes = require('./routes/index.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { sequelize } = require('./models/sequelize');
const logger = require('./config/logger.js');
const { errorResponse, successResponse } = require('./utils/responseHelper.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.get('/', (req, res) => {
  return successResponse(res);
});

app.use((req, res) => {
  return errorResponse(
    res,
    { message: `URL Path ${req.path} Not Found for this ${req.method} method` },
    404,
  );
});

sequelize
  .authenticate()
  .then(() => {
    console.log('=========== Postgres SQL DB Connected Successfuly!!');
    app.listen(PORT, () => {
      console.log(`=========== Server running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('************ DB Connection Error: ', error);
    logger.error('************ DB Connection Error: ', error);
  });
