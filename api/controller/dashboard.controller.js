const db = require('../model/connection');
const sequelize = require('sequelize');
const Invoices = db.invoices;
const Object = db.objects;
//const CostType = db.costTypes;

// TODO: New Feature: Objects should have the costTypes Totals as child to show on Dashboard
exports.getAllTotals = (req, res) => {
    Invoices.findAll({
        include: [Object],
        attributes: [
            'id',
            'objectId',
            'costTypeId',
            'total',
            [sequelize.fn('sum', sequelize.col('total')), 'total_amount']
        ],
        group: ['objectId'],
    })
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(500).send({ message : "Couldn't fetch data! " + err });
            });
};