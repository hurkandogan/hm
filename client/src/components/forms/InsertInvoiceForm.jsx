import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import InvoiceService from '../../connection/invoice.service';
import { InvoiceInput } from "../custom_hooks/InvoiceInput";
import { connect } from 'react-redux';
import { getObjects } from '../../redux/actions/objectAction';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: 'calc(100%)',
        minWidth: 120,
    },
}));

function InsertInvoiceForm(props) {
    const classes = useStyles();
    const [formData, changeHandler, clearForm] = InvoiceInput();

    useEffect(() => {
        props.getObjects();
    }, []);

    const objectsSelectBox = (data) => {
        return (
            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
        );
    };

    const saveInvoice = async e => {
        e.preventDefault();
        await InvoiceService.insertInvoice(formData)
            .then(response => console.log(response.data))
            .catch(err => console.log("Invoice is not created! " + err));
        await clearForm();
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
                        value={formData.date}
                        onChange={changeHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="objects">
                        Choose an Object*
                    </InputLabel>
                    <Select
                        labelId="objects"
                        id="objects"
                        name="objectId"
                        displayEmpty
                        autoWidth
                        value={formData.objectId}
                        onChange={changeHandler}
                        required
                    >
                        <MenuItem disabled key={0} value={''}>Choose an Object</MenuItem>
                        {props.objects.map(objectsSelectBox)}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="objects">
                        Choose the Cost Type*
                    </InputLabel>
                    <Select
                        labelId="costType"
                        id="costType"
                        name="costTypeId"
                        displayEmpty
                        autoWidth
                        value={formData.costTypeId}
                        onChange={changeHandler}
                        required
                    >
                        <MenuItem disabled key={0} value={''}>Choose the Cost Type</MenuItem>
                        <MenuItem value="086dabd0-7d21-11eb-8d22-c509cb1665f9">General (Only: Verwaltungskosten, Carls Aufw. und Praxis)</MenuItem>

                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField id="firm" name="firm" label="Firm" onChange={changeHandler} value={formData.firm} required />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField id="description" name="description" label="Description" onChange={changeHandler} value={formData.description} required />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField id="total" name="total" label="Cost" onChange={changeHandler} value={formData.total} required />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField id="invoiceLink" name="invoiceLink" label="Invoice Link" value={formData.invoiceLink} onChange={changeHandler} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="payment">
                        Choose the Payment Status*
                    </InputLabel>
                    <Select
                        labelId="payment"
                        id="payment"
                        name="payment"
                        displayEmpty
                        autoWidth
                        onChange={changeHandler}
                        required
                        value={formData.payment}
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