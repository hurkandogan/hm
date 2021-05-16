import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import findAllCostTypes from '../../connection/costTypes.service';
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
    const [costTypes, setCostTypes] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const objectId = useParams();

    const classes = useStyles();

    useEffect(() => {
        retrieveCostTypes();
    }, [objectId]);

    const retrieveCostTypes = () => {
        findAllCostTypes()
            .then(response => setCostTypes(response.data))
            .catch(err => console.log(err));
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
            costTypesTabContent.push(<TabPanel key={i} value={i} chosenTab={tabValue} panelCostType={costTypes[i].id} objectId={objectId} />);
        }
        return costTypesTabContent;
    };

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className={classes.root}>
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