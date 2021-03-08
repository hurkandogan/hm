import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InvoiceService from '../../services/invoice.service';
import findAllCostTypes from '../../services/costTypes.service';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';

function a11yProps(index) {
    return {
        id: `cost-tab-${index}`,
        'aria-controls': `cost-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function InvoiceTable(props) {
    const { objectId } = useParams();
    const [invoices, setInvoices] = useState([]);
    const [costTypes, setCostTypes] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [objectTotal, setObjectTotal] = useState(0);
    const [objectName, setObjectName] = useState('');

    const classes = useStyles();

    useEffect(() => {
        retrieveInvoices();
        retrieveCostTypes();
    }, [props.match.params.objectId]);

    const retrieveCostTypes = () => {
        findAllCostTypes()
            .then(response => setCostTypes(response.data))
            .catch(err => console.log(err));
    };

    const retrieveInvoices = () => {
        InvoiceService.findInvoices(objectId)
            .then(response => response.data)
            .then(data => {
                setInvoices(data[0].invoices);
                setObjectName(data[0].name);
                setObjectTotal(data[0].object_total);
            })
            .catch(err => console.log(err))
    };

    const loadTabs = () => {
        const costTypesCount = costTypes.length;
        const costTypesTabTitle = [];
        for (let i = 0; i < costTypesCount; i++) {
            costTypesTabTitle.push(<Tab key={i} label={costTypes[i].name} {...a11yProps(i)} />);
        }
        return costTypesTabTitle;
    };

    const loadTabContents = () => {
        const costTypesCount = costTypes.length;
        const costTypesTabContent = [];
        for (let i = 0; i < costTypesCount; i++) {
            costTypesTabContent.push(<TabPanel key={i} value={i} chosenTab={tabValue} panelCostType={costTypes[i].id} invoices={invoices} />);
        }
        return costTypesTabContent;
    };

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className={classes.root}>
            <h1>{objectName}</h1>
            <h3>{objectTotal ? 'Total: ' + objectTotal + '€' : ''}</h3>
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
                    {loadTabs()}
                </Tabs>
            </AppBar>
            {loadTabContents()}
        </div>
    );
}
export default InvoiceTable;