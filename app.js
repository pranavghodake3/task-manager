const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const routes = require('./routes/index.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongoose = require('mongoose');
const logger = require('./config/logger.js');
const MONGODB_CONNECTION_URL = `mongodb+srv://${process.env.MONGODB_DATABASE_USERNAME}:${encodeURIComponent(process.env.MONGODB_DATABASE_PASSWORD)}@${process.env.MONGODB_DATABASE_HOST}/${process.env.MONGODB_DATABASE_NAME}?appName=Pranavcluster`;
const { errorResponse } = require('./utils/responseHelper.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.use((req, res) => {
  return errorResponse(res, { message: `URL Path Not Found for this ${req.method} method` }, 404);
});

mongoose
  .connect(MONGODB_CONNECTION_URL)
  .then(() => {
    console.log('Mongo DB Connected Successfuly!!');
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('DB Connection Error: ', error);
    logger.error('DB Connection Error: ', error);
  });
