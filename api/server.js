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

// Routes
require("./routes/auth")(app);
require("./routes/index")(app);
require('./routes/objects')(app);
require("./routes/invoices")(app);
require("./routes/costTypes")(app);


app.listen(PORT, function() {
    console.log("Works on " + PORT);
});