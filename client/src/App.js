import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

// Components
import Header from './components/shared/Header';
import Sidebar from './components/navigation/Sidebar';
import Dashboard from './components/Dashboard';
import InvoiceTable from './components/invoices/InvoiceTable';
import AuthService from './services/authorization/auth.service';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

    const [loggedIn, setLogin] = useState(false);
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
    const submit = (e) => {
        e.preventDefault();

        AuthService.login(loginData)
            .then(res => {
                console.log(res);
                if (res.login) {
                    setLogin(true);
                } else {
                    setLogin(false);
                }
            })
            .catch(err => console.log(err));
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
                                {/* <div className={classes.login}>
                                    <h1>Welcome to Hausverwaltung Thönnessen</h1>
                                    <form onSubmit={submit}>
                                        <TextField
                                            name="mail"
                                            id="mail"
                                            label="Mail"
                                            onChange={changeHandler}
                                            />
                                        <br />
                                        <br />
                                        <TextField
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            onChange={changeHandler}
                                        />
                                        <br />
                                        <br />
                                        <Button variant="contained" color="primary" type="submit">
                                        Login
                                        </Button>
                                    </form>
                                </div> */}
                            
                        </Switch>
                    </div>
                </main>
            </div>
        </div>
  );
}
export default App;