import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography'
import moment from 'moment';

function Invoice(props) {

    const paymentBadge = (data) => {
        return data ? <Badge color="secondary"><Typography>Paid</Typography></Badge> : <Badge color="secondary" variant="dot"><Typography>Unpaid</Typography></Badge>;
    }
    return (
        <TableRow key={props.invoice.id}>
            <TableCell scope="row">{moment(props.invoice.date).format('DD-MM-YYYY')}</TableCell>
            <TableCell>{props.invoice.firm}</TableCell>
            <TableCell>{props.invoice.description}</TableCell>
            <TableCell>{props.invoice.total}</TableCell>
            <TableCell>{paymentBadge(props.invoice.payment)}</TableCell>
        </TableRow>
    );
}

export default Invoice;