const express = require('express');
const route = express.Router();
const Object = require('../controller/object.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/objects', Object.getAllObjects);
    app.get('/api/objects/:id', Object.getSingleObject); // Not yet implemented
    app.post('/api/objects/', Object.createObject);
    app.patch('/api/objects/update/:id', Object.updateObject); // Not yet implemented
    app.delete('/api/objects/delete/:id', Object.deleteObject);
};