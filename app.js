const express = require('express');
const app = express();
const PORT = 5000;
const routes = require('./routes/index.js')

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
