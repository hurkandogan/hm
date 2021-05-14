import React from 'react';
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import TopNav from "./components/TopNav";
import Artwork from "./components/artwork/Artwork";
import Login from "./components/auth/Login";

// Redux
import { connect } from 'react-redux';
import { getObjects } from './redux/actions/objectAction';


function App(props) {
    return (
        <div>
            <Router>
                <Switch>
                <Route exact path="/">
                    <Login />
                    </Route>
                
                    < TopNav />
                    <Route path={'/artwork'} component={Artwork} />
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