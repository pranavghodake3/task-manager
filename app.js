const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const routes = require('./routes/index.js');

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
