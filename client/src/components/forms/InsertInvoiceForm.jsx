import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import InvoiceService from '../../services/invoice.service';
import findAllObjects from "../../services/object.service";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: 'calc(100%)',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function InsertInvoiceForm() {
    const classes = useStyles();
    const [objectsList, setObject] = useState([]);
    const [formData, setFormData] = useState({
        objectID: '',
        costTypeID: '',
        date: '',
        firm: '',
        description: '',
        total: '',
        payment: false,
        invoiceLink: ''
    });

    useEffect(() => {
        objectData();
    }, []);

    const objectData = () => {
        findAllObjects()
            .then(response => {
                const objects = response.data
                setObject(objects);
            })
            .catch(err => console.log("Sidebar#Sidebar#retrieveObjects: " + err));
    }
    const objectsSelectBox = (data) => {
        return (
            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
        );
    };

    const changeHandler = (event) => {
        const { value, name } = event.target;
        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };

    const saveInvoice = () => {

        InvoiceService.insertInvoice(formData)
            .then(response => console.log(response))
            .catch(err => console.log("Invoice is not created! " + err));
    };

    return (
        <div>
            <div className="page-headline">
                <h2>Insert new invoice</h2>
            </div>
            <FormControl className={classes.formControl}>
                <TextField
                    id="date"
                    name="date"
                    label="Invoice Date"
                    type="date"
                    defaultValue="YYYY-DD-MM"
                    onChange={changeHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel shrink id="objects">
                    Choose an Object
                </InputLabel>
                <Select
                    labelId="objects"
                    id="objects"
                    name="objectID"
                    displayEmpty
                    autoWidth
                    onChange={changeHandler}
                >
                    <MenuItem disabled key={0} value={''}>Choose an Object</MenuItem>
                    {objectsList.map(objectsSelectBox)}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel shrink id="objects">
                    Choose the Cost Type
                </InputLabel>
                <Select
                    labelId="costType"
                    id="costType"
                    name="costTypeID"
                    displayEmpty
                    autoWidth
                    onChange={changeHandler}
                >
                    <MenuItem disabled key={0} value={''}>Choose the Cost Type</MenuItem>
                    <MenuItem value="643f5cb0-792f-11eb-a99c-f3343616cad9">General (Only: Verwaltungskosten, Carls Aufw. und Praxis)</MenuItem>
                    {/* <MenuItem value="28e5a600-5040-11eb-b5b3-0ddba2819351">Erhaltungsaufwendungen</MenuItem>
                    <MenuItem value="2d7d2f80-5040-11eb-b5b3-0ddba2819351">Nebenkosten</MenuItem>
                    <MenuItem value="3361ab60-5040-11eb-b5b3-0ddba2819351">Weitere Aufwendungen</MenuItem>
                    <MenuItem value="38ea2490-5040-11eb-b5b3-0ddba2819351">Versicherungen</MenuItem> */}

                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField id="firm" name="firm" label="Firm" onChange={changeHandler} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField id="description" name="description" label="Description" onChange={changeHandler} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField id="total" name="total" label="Cost" onChange={changeHandler} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField id="invoiceLink" name="invoiceLink" label="Invoice Link" onChange={changeHandler} />
            </FormControl>
            <FormControl className={classes.formControl}>
                Payment: <Checkbox onChange={changeHandler} name="payment" id="payment" />
            </FormControl>
            <Button variant="contained" color="primary" onClick={saveInvoice}>Submit</Button>
        </div>
    );
}

export default InsertInvoiceForm;