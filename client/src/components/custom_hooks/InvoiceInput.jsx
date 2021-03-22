import { useState } from 'react';

export const InvoiceInput = () => {

    const [inputs, setInputs] = useState({
        objectId: '',
        costTypeId: '',
        date: '',
        firm: '',
        description: '',
        total: '',
        payment: '',
        invoiceLink: ''
    });

    const changeHandler = event => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };
    return [inputs, changeHandler];
};