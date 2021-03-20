import common_http from './common_http';

const findInvoices = (objectId) => {
    return common_http.get("/api/invoices/" + objectId);
}

const insertInvoice = (data) => {
    return common_http.post("/api/invoices", data);
}

const updateInvoice = (data) => {
    return common_http.put("/api/invoices/update/" + data.id, data);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    findInvoices,
    insertInvoice,
    updateInvoice
};