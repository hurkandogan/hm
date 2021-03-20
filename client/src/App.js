import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

// Components
import Header from './components/shared/Header';
import Sidebar from './components/navigation/Sidebar';
import Dashboard from './components/Dashboard';
import InvoiceTable from './components/invoices/InvoiceTable';
import AuthService from './services/authorization/auth.service';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

//import Dashboard from "./components/Dashboard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    login: {
        margin: 'calc(10%)',
        marginLeft: '50px',
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

    const [loginData, setLoginData] = useState({
        mail: "",
        password: ""
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setLoginData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    return (
        <div>
            <div className={classes.root}>
                <Header />
                <Sidebar />
                <main className={classes.content}>
                    <div className={classes.toolbar}>
                        <Switch>
                                <Route exact path={'/'} component={Dashboard} />
                                <Route exact path={'/invoices/:objectId'} component={InvoiceTable} />       
                        </Switch>
                    </div>
                </main>
            </div>
        </div>
  );
}
export default App;