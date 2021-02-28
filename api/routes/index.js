const express = require('express');
const router = express.Router();
const Dashboard = require('../controller/dashboard.controller');

router.get("/", Dashboard.getAllTotals);

module.exports = router;