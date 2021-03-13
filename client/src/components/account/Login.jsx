import React, { useState } from 'react';
import AuthService from '../../services/authorization/auth.service';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 'calc(10%)',
        marginLeft: '50px',
    },
}));

function Login() {

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
    const login = (data) => {
        AuthService.login(data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div className={classes.root}>
            <h1>Welcome to Hausverwaltung Thönnessen</h1>
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
            <Button variant="contained" color="primary" type="submit" onClick={login(loginData)}>
                Login
        </Button>
        </div>);
}

export default Login;