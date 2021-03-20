const db = require('../model/connection');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Invoice = db.invoices;
const Object = db.objects;
const CostType = db.costTypes;

exports.getAllTotals = (req, res) => {
    Object.findAll({
        attributes: [
            ['id', 'objectID'],
            'name',
            'objectType'
        ],
        include:
            {
                model: Invoice,
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('total')), 'totals']
                ],
                group: 'objectId'
            },
        group: 'id'
    })
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(500).send({ message : "dashboard.controller#getAllTotals: Couldn't fetch data! " + err });
            });
};