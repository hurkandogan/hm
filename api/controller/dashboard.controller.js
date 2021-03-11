const db = require('../model/connection');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Invoice = db.invoices;
const Object = db.objects;
const CostType = db.costTypes;

// TODO: New Feature: Objects should have the costTypes Totals as child to show on Dashboard
exports.getAllTotals = (req, res) => {
    Object.findAll({
        attributes: [
            'id',
            'name',
            'objectType',
            [Sequelize.literal(`(SELECT SUM(invoices.total) FROM invoices WHERE invoices.objectId = "` + {$col: Object.id} +`")`), 'totals']
        ],
        group: 'id' 
    })
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(500).send({ message : "dashboard.controller#getAllTotals: Couldn't fetch data! " + err });
            });
};