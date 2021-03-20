import React, { useState, useEffect } from 'react';
import DashboardService from "../services/dashboard.service";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Header from './shared/Header';
import Sidebar from './navigation/Sidebar';

function Dashboard() {

    const useStyles = makeStyles({
        root: {
            width: 300,
            float: 'left',
            margin: '25px 50px',
        },
    });

    const classes = useStyles();
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        objectData();
    }, []);

    const objectData = () => {
        DashboardService.loadDashboardTotals()
            .then(response => setObjects(response.data))
            .catch(err => console.log("Sidebar#Sidebar#retrieveObjects: " + err));
    }

    const loadObjectCards = (data) => {
        return (
            <Card key={data.objectID} className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Total: {data.invoices[0].totals} €
                    </Typography>
                </CardContent>
            </Card>
        );
    };
    return (
        <div>
            <Header />
            <Sidebar />
            {objects.map(loadObjectCards)}
        </div>
    );
}

export default Dashboard;