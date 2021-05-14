import React, { useState, useEffect } from 'react';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 80%',
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
}));

const headCells = [
    { id: '0', label: 'Date' },
    { id: '1', label: 'Firm' },
    { id: '2', label: 'Description' },
    { id: '3', label: 'Total' },
];

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">Edit</TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={'default'}
                    >
                        <TableSortLabel>
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                {props.objectName}
            </Typography>
            <Typography title="Delete">
                Total: {props.objectTotal} €
            </Typography>
        </Toolbar>
    );
};


const TabPanel = (props) => {
    const classes = useStyles();
    const objectId = useState(props.objectId);
    const [rowsCount, setRowsCount] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [objectData, setObjectData] = useState({
        objectName: '',
        objecttTotal: 0,
        invoices: []
    });

    // useEffect(() => {
    //     retrieveInvoices();
    // }, [props.objectId, currentPage, rowsPerPage]);


    // const retrieveInvoices = () => {
    //     const params = getRequestParams(objectId[0].objectId, currentPage, rowsPerPage);

    //     InvoiceService.findInvoices(params)
    //         .then(response => response.data)
    //         .then(async data => {
    //             await setPageCount(data.totalPages);
    //             await setRowsCount(data.totalItems);
    //             await setObjectData({
    //                 invoices: data.items,
    //                 objectName: 'Test',
    //                 objecttTotal: 0
    //             });
    //         })
    //         .catch(err => console.log(err))
    // };

    const getRequestParams = (objectId, page, rowsPerPage) => {
        let params = {};
        if (objectId) { params["objectId"] = objectId; }
        if (objectId) { params["page"] = currentPage - 1; }
        if (objectId) { params["rowsPerPage"] = rowsPerPage; }
        return params;
    }

    // const iterateAndFilterInvoices = (data) => {
    //     return <Invoice key={data.id} invoice={data} />
    // };



    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar objectName={objectData.objectName} objectTotal={objectData.objectTotal} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            rowCount={rowsCount}
                        />
                        <TableBody>
                            {/* {objectData.invoices.map(iterateAndFilterInvoices)} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination count={pageCount} page={currentPage} onChange={handleChangePage} rowsPerPage={rowsPerPage} color="secondary" />
                <InputLabel htmlFor="rows-per-page">Rows Per Page</InputLabel>
                <Select
                    native
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    inputProps={{
                        name: 'Rows',
                        id: 'rows-per-page',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                </Select>
            </Paper>
        </div>
    );
};

export default TabPanel;