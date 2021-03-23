import React, {useEffect} from 'react';
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Components
import Header from './components/shared/Header';
import Sidebar from './components/navigation/Sidebar';
import Dashboard from './components/Dashboard';
import InvoiceTable from './components/invoices/InvoiceTable';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { getObjects } from './redux/actions/objectAction';

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

function App(props) {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Router>
                <Header />
                <Sidebar />
                <main className={classes.content}>
                <div className={classes.toolbar}>
                        <Switch>
                            <Route exact path={'/'} render={ () => <Dashboard />} />
                            <Route path={'/invoices/:objectId'} render={ () => <InvoiceTable />} />       
                        </Switch>
                    </div>
                </main>
                </Router>
            </div>
  );
}

const mapStateToProps = state => {
    return {
        objects: state.objects
    };
}
export default connect(mapStateToProps, { getObjects })(App);