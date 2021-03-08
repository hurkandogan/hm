import common_http from './common_http';

const findInvoices = (objectId) => {
    return common_http.get("/api/invoices/" + objectId);
}

const insertInvoice = (data) => {
    return common_http.post("/api/invoices", data);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    findInvoices,
    insertInvoice
};