const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const process = require('process');
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);
require('dotenv').config();

// Port
const PORT = process.env.PORT || 5000;

// App
const app = express();

// Cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Session
const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}
const sessionStore = new MySqlStore(options);
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    saveUninitialized: false,
    resave: true,
    name: 'hm_auth',
    cookie: {
        maxAge: 24*60*60*1000,
        secure: false
    }
}));

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