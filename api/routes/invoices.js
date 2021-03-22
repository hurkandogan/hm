const express = require('express');
const router = express.Router();
const Invoice = require('../controller/invoice.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/api/invoices', Invoice.getAllInvoices);
    app.get('/api/invoices/:objectId', Invoice.getObjectInvoices);
    app.post('/api/invoices', Invoice.createInvoice);
    app.put('/api/invoices/update/:id', Invoice.updateInvoice);
    app.delete('/api/invoices/delete/:id', Invoice.deleteInvoice);
};