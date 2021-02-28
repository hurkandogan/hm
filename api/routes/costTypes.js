const express = require('express');
const route = express.Router();
const CostType = require('../controller/costTypes.controller');

route.post('/', CostType.createCostTypes);
route.get('/', CostType.getAllCostTypes);

module.exports = route;