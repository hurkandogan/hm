import React from 'react';
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import TopNav from "./components/TopNav";

// Redux
import { connect } from 'react-redux';
import { getObjects } from './redux/actions/objectAction';


function App(props) {
    return (
        <div>
            <TopNav />
            <Router>
                <Switch>
                    <Route exact path={'/'} />
                    <Route path={'/invoices/:objectId'} />
                </Switch>
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