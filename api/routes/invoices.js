const express = require('express');
const router = express.Router();
const Invoice = require('../controller/invoice.controller');

router.get('/', Invoice.getAllInvoices);
router.get('/:objectID', Invoice.getObjectInvoices);
router.post('/', Invoice.createInvoice);
router.delete('/delete/:id', Invoice.deleteInvoice);

module.exports = router;