import React, { useEffect, useState } from "react";
import Invoice from "./Invoice";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function TabPanel(props) {

    const classes = useStyles();

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fillInvoices();
    }, [props.invoices]
    );

    const fillInvoices = () => {
        setInvoices(props.invoices);
    };

    const iterateAndFilterInvoices = (data) => {
        // TODO:  This part is wrong. It should be filtered with React reduce() or filter()
        if (data.costTypeId === props.panelCostType) {
            return <Invoice key={data.id} invoice={data} />
        }
    };

    return (
        <div
            role="tabpanel"
            hidden={props.chosenTab !== props.value}
            id={`cost-tabpanel-${props.value}`}
            aria-labelledby={`cost-tab-${props.value}`}
        >
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Firma</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Total</TableCell>
                            <TableCell align="left">Payment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map(iterateAndFilterInvoices)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TabPanel;