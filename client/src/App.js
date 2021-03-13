import React from 'react';
import { Switch, Route } from "react-router-dom";

// Components
import Header from './components/shared/Header';
import Sidebar from './components/navigation/Sidebar';
import Login from './components/account/Login';
import InvoiceTable from './components/invoices/InvoiceTable';
//import Dashboard from "./components/Dashboard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: '60px',
    },
}));

function App() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Header currentUser={'Hürkan Dogan'} />
                <Sidebar />
                <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Switch>
                        <Route exact path={'/'} component={Login} />
                        <Route exact path={'/invoices/:objectId'} component={InvoiceTable} />
                    </Switch>
                </div>
             </main>
            </div>
        </div>
  );
}
export default App;