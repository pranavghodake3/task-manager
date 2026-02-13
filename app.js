const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const routes = require('./routes/index.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
