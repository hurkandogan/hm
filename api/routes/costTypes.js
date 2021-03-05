const express = require('express');
const route = express.Router();
const CostType = require('../controller/costTypes.controller');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/costTypes', CostType.createCostTypes);
    app.get('/api/costTypes', CostType.getAllCostTypes);
};