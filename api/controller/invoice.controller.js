const Sequelize = require('sequelize');
const { sequelize } = require('../model/connection');
const db = require('../model/connection');
const Invoice = db.invoices;
const Object = db.objects;
const CostType = db.costTypes;

// Select
exports.getAllInvoices = (req, res) => {
    Invoice.findAll({ include: [Object, CostType] })
        .then( data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occured with getting invoices." + err
            });
    });
};
exports.getObjectInvoices = (req, res) => {
    const objectId = req.params.objectID;
    Object.findAll({
        where: {
            id: objectId
        },
        attributes: [
            'id',
            'name',
            'objectType',
            //[Sequelize.fn('SUM', Sequelize.col('invoices.total')), 'object_total']
            [Sequelize.literal(`(SELECT SUM('invoices.total') FROM invoices, objects WHERE invoices.objectId = objects.id)`), 'totals']
        ],
        include: [
            {
                model: Invoice,
                attributes: [
                    'id',
                    'objectId',
                    'costTypeId',
                    'date',
                    'firm',
                    'description',
                    'total',
                    'payment',
                    'invoiceLink',
                ],
                include: {
                model: CostType,
                    attributes: [
                        'id',
                        'name',
                        'objectType'
                ]
                },
            }
        ],
        group: ['invoices.id'],
    })
        .then( data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occured with getting invoices." + err
            });
        });
};

// Insert
exports.createInvoice = (req, res) => {

    const objectID = req.body.objectID;
    const costTypeID = req.body.costTypeID;
    const date = req.body.date;
    const firm = req.body.firm;
    const description = req.body.description;
    const total = req.body.total;
    const payment = req.body.payment;
    const link = req.body.invoiceLink;

    // TODO: Validation for data insert

    if(!objectID || !costTypeID || !date || !total){
        res.status(400).send({
            message: "Some of the informations are not filled."
        });
        return;
    }

    const data = {
        objectId: objectID,
        costTypeId: costTypeID,
        date: date,
        firm: firm,
        description: description,
        total: total,
        payment: payment,
        invoiceLink: link
    }

    Invoice.create(data)
        .then(data => {
            res.send("New invoice is created: " + JSON.stringify(data, null, 4));
        })
        .catch(err => {
            res.status(500).send({
                message: "invoice.controller#createInvoice: An error occured: " + err
            });
        });
};

// Update
// Delete
exports.deleteInvoice = (req, res) => {
  const id = req.params.id;
  Invoice.destroy({
      where: {
          id: id
      }
  })
      .then(data => {
          if(data){
              res.status(200).send({
                  message: 'Invoice is succesfully deleted.'
              });
          } else {
              res.status(404).send({
                  message: 'Invoice is not found.'
              });
          }
    })
      .catch(err => {
          res.status(500).send({
              message: 'An error occured with deleting: ' +err
          });
      });
};