const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const process = require('process');
const session = require('express-session');
require('dotenv').config();

// Port
const PORT = process.env.PORT || 5000;

// App
const app = express();

// Cors
app.use(cors());

// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    //store: sessionStorage,
    saveUninitialized: false,
    resave: true
}));

//sessionStorage.sync();

// Static Files
const environment = process.env.NODE_ENV;
if (environment === 'prod') {
    console.log("Project is in production environment.")
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'client/build')));   
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    console.log("Project is in development environment.")
}

app.use(body.urlencoded({extended: true}));
app.use(body.json());

// Routes
require("./api/routes/auth")(app);
require("./api/routes/index")(app);
require('./api/routes/objects')(app);
require("./api/routes/invoices")(app);
require("./api/routes/costTypes")(app);

app.listen(PORT, function() {
    console.log("Server is alive on port: " + PORT);
});