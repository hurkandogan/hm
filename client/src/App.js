import React, {useState, useEffect} from 'react';
import { Switch, HashRouter } from "react-router-dom";

// Components
import Header from './components/shared/Header';
import Sidebar from './components/navigation/Sidebar';
import Login from './components/account/Login';
import InvoiceTable from './components/invoices/InvoiceTable';
import Dashboard from "./components/Dashboard";
import { makeStyles } from '@material-ui/core/styles';

//Services
import AuthService from './services/authorization/auth.service';

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
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {setCurrentUser(user);}
    }, [])

    const loginSubmit = async (data) => {
        try {
            await AuthService.login(data);
            //user = await AuthService.getCurrentUser();
        } catch (err) {
            console.log(err);
        }
        window.location.reload();
    }


    return (
        <div>
            {!currentUser ? 
            <Login login={loginSubmit} />
                :
                <div className={classes.root}>
                <Header currentUser={currentUser} />
                <Sidebar />
                <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Switch>
                        <HashRouter exact path={'/'} component={Dashboard} />
                        <HashRouter exact path={'/invoices/:objectId'} component={InvoiceTable} />
                    </Switch>
                </div>
             </main>
            </div>
            }
        </div>
  );
}
export default App;