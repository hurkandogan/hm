import { useState } from 'react';

export const InvoiceInput = () => {

    const [inputs, setInputs] = useState({
        objectId: '',
        costTypeId: '',
        date: '',
        firm: '',
        description: '',
        total: '',
        payment: 0,
        invoiceLink: ''
    });

    const changeHandler = event => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    const clearForm = () => {
        setInputs({
            objectId: '',
            costTypeId: '',
            date: '',
            firm: '',
            description: '',
            total: '',
            payment: 0,
            invoiceLink: ''
        });
    };

    return [inputs, changeHandler, clearForm];
};