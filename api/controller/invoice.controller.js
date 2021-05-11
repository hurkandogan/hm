const Sequelize = require('sequelize');
const { sequelize } = require('../model/connection');
const db = require('../model/connection');
const pagination = require ('../helpers/pagination');
const Invoice = db.invoices;
const Object = db.objects;
const CostType = db.costTypes;

// Select
exports.getAllInvoices = (req, res) => {
    const { objectId, page, rowsPerPage } = req.query;
    const { limit, offset } = pagination.getPagination(page, rowsPerPage);

    console.log('limit' + limit + ' offset' + offset);

    Invoice.findAndCountAll({
        where: {
            objectId: objectId
        },
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
            model: Object,
            attributes: [
                'name',
                'objectType'
            ]
        },
        include: {
            model: CostType,
            attributes:[
                'id',
                'name',
                'objectType'
            ]
        },
        order: [
            ['date', 'DESC'],
            ['createdAt', 'DESC']
        ],
        limit,
        offset
    })
        .then(data => {
            const response = pagination.getPagingData(data, page, limit);
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occured with getting invoices." + err
            });
    });
};

exports.getObjectInvoices = (req, res) => {
    const objectId = req.params.objectId;
    Object.findAll({
        where: {
            id: objectId
        },
        attributes: [
            'id',
            'name',
            'objectType',
            [Sequelize.literal(`(SELECT SUM(invoices.total) FROM invoices WHERE invoices.objectId = "`+ objectId +`")`), 'totals']
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
                order: [
                    ['date', 'DESC'],
                    ['createdAt', 'DESC']
                ],
            }
        ],
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

    const objectId = req.body.objectId;
    const costTypeId = req.body.costTypeId;
    const date = req.body.date;
    const firm = req.body.firm;
    const description = req.body.description;
    const total = req.body.total;
    const payment = req.body.payment;
    const link = req.body.invoiceLink;
    // TODO: Validation for data insert

    if(!objectId || !costTypeId || !date || !total){
        res.status(400).send({
            message: "Some of the informations are not filled."
        });
        return;
    }

    const data = {
        objectId: objectId,
        costTypeId: costTypeId,
        date: date,
        firm: firm,
        description: description,
        total: total,
        payment: payment,
        invoiceLink: link
    }
    
    Invoice.create(data)
        .then(data => {
            console.log(data);
            res.send("New invoice is created: " + JSON.stringify(data, null, 4));
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "invoice.controller#createInvoice: An error occured: " + err
            });
        });
};

// Update
exports.updateInvoice = (req, res) => {
    const id = req.params.id;
    Invoice.update({
        objectId: req.body.objectId,
        costTypeId: req.body.costTypeId,
        date: req.body.date,
        firm: req.body.firm,
        description: req.body.description,
        total: req.body.total,
        payment: req.body.payment,
        link: req.body.invoiceLink
    }, {
      where: {
          id: id
      }
  })
      .then(data => {
          if (data) {
              console.log("Invoice with id: '" + id +  "' updated.");
              res.status(200).send({
                  message: 'Invoice is succesfully updated.'
              });
          } else {
              res.status(404).send({
                  message: 'Invoice is not found.'
              });
          }
    })
      .catch(err => {
          res.status(500).send({
              message: 'invoice.controller#updateInvoice: ' +err
          });
      });
};

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