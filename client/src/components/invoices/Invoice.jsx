import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography'
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

function Invoice(props) {
    const [open, setOpen] = useState(false);

    const paymentBadge = (data) => {
        return data ? <Badge color="secondary"><Typography>Paid</Typography></Badge> : <Badge color="secondary" variant="dot"><Typography>Unpaid</Typography></Badge>;
    }
    return (
        <React.Fragment>
            <TableRow key={props.invoice.id}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell scope="row">{moment(props.invoice.date).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{props.invoice.firm}</TableCell>
                <TableCell>{props.invoice.description}</TableCell>
                <TableCell>{props.invoice.total}</TableCell>
                <TableCell>{paymentBadge(props.invoice.payment)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">Edit</Typography>
                            <form>
                                <TextField
                                    id="date"
                                    name="date"
                                    label="Invoice Date"
                                    type="date"
                                    defaultValue="yyy-MM-dd"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-helperText"
                                    label="Firm"
                                    defaultValue="Default Value"
                                />
                                <TextField
                                    id="standard-helperText"
                                    label="Desc."
                                    defaultValue="Default Value"
                                />
                                <TextField
                                    id="standard-helperText"
                                    label="Amount"
                                    defaultValue="Default Value"
                                />
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={0}
                                    onChange={console.log("Test")}
                                >
                                    <MenuItem value={0}>Unpaid</MenuItem>
                                    <MenuItem value={1}>Paid</MenuItem>
                                </Select>
                                <Button variant="contained" color="primary">
                                    Primary
                                </Button>
                            </form>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Invoice;