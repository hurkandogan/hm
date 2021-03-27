import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Invoice from "./Invoice";
import InvoiceService from '../../services/invoice.service';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const headCells = [
    { id: '0', label: 'Date' },
    { id: '1', label: 'Firm' },
    { id: '2', label: 'Description' },
    { id: '3', label: 'Total' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">Edit</TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};



const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

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

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


const TabPanel = (props) => {
    const classes = useStyles();
    const objectId = useState(props.objectId);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [objectData, setObjectData] = useState({
        objectName: '',
        objecttTotal: 0,
        invoices: []
    });

    useEffect(() => {
        retrieveInvoices();
    }, [props.objectId]);


    const retrieveInvoices = () => {
        const params = getRequestParams(objectId[0].objectId, page, rowsPerPage, setRowsPerPage);


        InvoiceService.findInvoices(params)
            .then(response => response.data)
            .then(async data => {
                await setPage(data.totalPages);
                await setObjectData({
                    invoices: data.items,
                    objectName: 'Test',
                    objecttTotal: 0
                });
            })
            .catch(err => console.log(err))
    };

    const getRequestParams = (objectId, page, rowsPerPage) => {
        let params = {};
        if (objectId) { params["objectId"] = objectId; }
        if (objectId) { params["page"] = page; }
        if (objectId) { params["rowsPerPage"] = rowsPerPage; }
        return params;
    }

    const iterateAndFilterInvoices = (data) => {
        return <Invoice key={data.id} invoice={data} />
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                            rowCount={objectData.invoices.length}
                        />
                        <TableBody>
                            {objectData.invoices.map(iterateAndFilterInvoices)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={objectData.invoices.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default TabPanel;