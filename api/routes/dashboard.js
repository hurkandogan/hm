const express = require('express');
const router = express.Router();
const Dashboard = require('../controller/dashboard.controller');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/dashboard", Dashboard.getAllTotals);
};