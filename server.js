const express = require("express");
const app = express();
const PORT = process.env. PORT || 5000;
const { errorResponse } = require("./utils/responseHelper");
require('dotenv').config();

app.use(express.json());

const apiRoutes = require("./routes/index");

app.use("/api", apiRoutes);

// 404
app.use((req, res) => {
    return errorResponse(res, null, "API Not Found", 404);
});

app.listen(PORT, () => {
    console.log('Server is running on PORT',PORT);
});
