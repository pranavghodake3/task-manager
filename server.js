const express = require("express");
const app = express();
const PORT = process.env. PORT || 5000;
const { errorResponse } = require("./utils/responseHelper");
require('dotenv').config();
const DBConnect = require("./config/db");
const apiRoutes = require("./routes/index");

app.use(express.json());

app.use("/api", apiRoutes);

// 404
app.use((req, res) => {
    return errorResponse(res, null, "API Not Found", 404);
});

DBConnect().then(() => {
    console.log("\n**************************************************")
    console.log("**************************************************\n")
    console.log('Database Connected Successfully!!');
    console.log("\n**************************************************")
    console.log("**************************************************\n")
    app.listen(PORT, () => {
        console.log("\n**************************************************")
        console.log("**************************************************\n")
        console.log('Server is running on PORT',PORT);
        console.log("\n**************************************************")
        console.log("**************************************************\n")
    });
})
.catch(error => {
    console.log("\n**************************************************")
    console.log("**************************************************\n")
    console.log('Database Connection Error: ',error);
    console.log("\n**************************************************")
    console.log("**************************************************\n")
})

