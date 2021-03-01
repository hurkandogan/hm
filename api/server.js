const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const path = require('path');
const process = require('process');
require('dotenv').config();

// Port
const PORT = process.env.PORT || 5000;

// App
const app = express();

// Cors
app.use(cors());

// Static Files
//app.use(express.static(path.join(__dirname, 'build')));

app.use(body.urlencoded({extended: true}));
app.use(body.json());

// Login
require("./routes/auth")(app);

const indexRouter = require("./routes/index");
const objectsRouter = require("./routes/objects");
const invoicesRouter = require("./routes/invoices");
const costTypesRouter = require("./routes/costTypes");

app.use("/api/dashboard", indexRouter);
app.use("/api/objects", objectsRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/costTypes", costTypesRouter);


app.listen(PORT, function() {
    console.log("Works on " + PORT);
});