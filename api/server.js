const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const process = require('process');
require('dotenv').config();

// Port
const PORT = process.env.PORT || 5000;

// App
const app = express();

// Cors
app.use(cors());

// Static Files
const env = process.env.NODE_ENV;
if (env == 'prod') {
    const path = require('path');
    // TODO: Path is not correct! After react-build should be changed
    app.use(express.static(path.join(__dirname, 'build')));
}

app.use(body.urlencoded({extended: true}));
app.use(body.json());

// Login
require("./routes/auth")(app);
require('./routes/objects')(app);

const indexRouter = require("./routes/index");
const invoicesRouter = require("./routes/invoices");
const costTypesRouter = require("./routes/costTypes");

app.use("/api/dashboard", indexRouter);
//app.use("/api/objects", objectsRouter);

app.use("/api/invoices", invoicesRouter);
app.use("/api/costTypes", costTypesRouter);


app.listen(PORT, function() {
    console.log("Works on " + PORT);
});