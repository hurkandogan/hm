const db = require('../model/connection');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Invoice = db.invoices;
const Object = db.objects;

exports.getAllTotals = (req, res) => {
    console.log("Dashboard called");
};