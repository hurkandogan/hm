import React, { useState, useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import InputAdornment from '@material-ui/core/InputAdornment';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InvoiceService from '../../connection/invoice.service';

function Invoice(props) {
    const [open, setOpen] = useState(false);
    const [invoice, setInvoice] = useState({
        costType: '',
        costTypeId: '',
        date: '',
        description: '',
        firm: '',
        id: '',
        invoiceLink: '',
        objectId: '',
        payment: '',
        total: 0
    });

    useEffect(() => {
        setInvoice(props.invoice);
    }, [props.invoice]);

    const updateInvoice = async (e) => {
        await InvoiceService.updateInvoice(invoice)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        e.preventDefault();
    }

    const changeHandler = (event) => {
        const { value, name } = event.target;
        setInvoice({ ...invoice, [name]: value });
    }

    return (
        <React.Fragment>
            <TableRow key={invoice.id}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell scope="row">{moment(invoice.date).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{invoice.firm}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>{invoice.total} €</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <form onSubmit={updateInvoice}>
                                <TextField
                                    id="date"
                                    name="date"
                                    label="Invoice Date"
                                    type="date"
                                    defaultValue={moment(invoice.date).format('yyyy-MM-DD')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={changeHandler}
                                />
                                <TextField
                                    id="standard-helperText"
                                    label="Firm"
                                    name="firm"
                                    defaultValue={invoice.firm}
                                    onChange={changeHandler}
                                />
                                <TextField
                                    id="standard-helperText"
                                    label="Desc."
                                    name="description"
                                    defaultValue={invoice.description}
                                    onChange={changeHandler}
                                />
                                <TextField
                                    id="standard-helperText"
                                    name="total"
                                    label="Total"
                                    defaultValue={invoice.total}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                    }}
                                    onChange={changeHandler}
                                />
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="payment"
                                    value={invoice.payment ? 1 : 0}
                                    onChange={changeHandler}
                                >
                                    <MenuItem value={0}>Unpaid</MenuItem>
                                    <MenuItem value={1}>Paid</MenuItem>
                                </Select>
                                <Button variant="contained" color="primary" type="submit">
                                    Save
                                </Button>
                            </form>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

export default Invoice;