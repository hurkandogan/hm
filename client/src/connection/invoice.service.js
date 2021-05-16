import api from './common_http';

const findInvoices = (params) => {
    return api.get(`/api/invoices/`, {params});
}

const insertInvoice = (data) => {
    return api.post("/api/invoices", data);
}

const updateInvoice = (data) => {
    return api.put("/api/invoices/update/" + data.id, data);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    findInvoices,
    insertInvoice,
    updateInvoice
};