import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import InvoiceService from '../../services/invoice.service';
import { InvoiceInput } from "../custom_hooks/InvoiceInput";
import { connect } from 'react-redux';
import { getObjects } from '../../redux/actions/objectAction';

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

function InsertInvoiceForm(props) {
    const classes = useStyles();
    const [formData, changeHandler] = InvoiceInput();

    useEffect(() => {
        props.getObjects();
    }, []);


    const objectsSelectBox = (data) => {
        return (
            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
        );
    };

    const saveInvoice = e => {
        InvoiceService.insertInvoice(formData)
            .then(response => console.log(response))
            .catch(err => console.log("Invoice is not created! " + err));
        console.log(formData);
        //e.preventDefault();
    };

    return (
        <div>
            <div className="page-headline">
                <h2>Insert new invoice</h2>
            </div>
            <form onSubmit={saveInvoice}>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="date"
                        name="date"
                        label="Invoice Date"
                        type="date"
                        defaultValue="yyy-MM-dd"
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
                        name="objectId"
                        displayEmpty
                        autoWidth
                        onChange={changeHandler}
                    >
                        <MenuItem disabled key={0} value={''}>Choose an Object</MenuItem>
                        {props.objects.map(objectsSelectBox)}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="objects">
                        Choose the Cost Type
                    </InputLabel>
                    <Select
                        labelId="costType"
                        id="costType"
                        name="costTypeId"
                        displayEmpty
                        autoWidth
                        onChange={changeHandler}
                    >
                        <MenuItem disabled key={0} value={''}>Choose the Cost Type</MenuItem>
                        <MenuItem value="086dabd0-7d21-11eb-8d22-c509cb1665f9">General (Only: Verwaltungskosten, Carls Aufw. und Praxis)</MenuItem>
                        {/* 
                    <MenuItem value="28e5a600-5040-11eb-b5b3-0ddba2819351">Erhaltungsaufwendungen</MenuItem>
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
                    <InputLabel shrink id="payment">
                        Choose the Payment Status
                    </InputLabel>
                    <Select
                        labelId="payment"
                        id="payment"
                        name="payment"
                        displayEmpty
                        autoWidth
                        onChange={changeHandler}
                    >
                        <MenuItem disabled value={''}>Choose status</MenuItem>
                        <MenuItem value={1}>Paid</MenuItem>
                        <MenuItem value={0}>Not Paid</MenuItem>

                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        objects: state.objects
    };
};

export default connect(mapStateToProps, { getObjects })(InsertInvoiceForm);