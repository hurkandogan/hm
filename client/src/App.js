import React, {useState, useEffect} from 'react';
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Services
import AuthService from "./services/authorization/auth.service";

// Components
import Login from "./components/auth/Login";
import TopNav from "./components/shared/TopNav";
import Sidebar from "./components/shared/Sidebar";
import Artwork from "./components/artwork/Artwork";

// Redux
import { connect } from 'react-redux';
import { getObjects } from './redux/actions/objectAction';


function App() {
    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Router>
            {!currentUser.accessToken ? (
                <Login />
            ) : (
            <div>
                <TopNav />
                <Sidebar />
                        
                <Switch>
                    <Route exact path = {'/'} />
                    <Route exact path = {'/artwork'} component = {Artwork}/>
                </Switch>
                </div> 
            )}
        </Router>
    );
}

const mapStateToProps = state => {
    return {
        objects: state.objects
    };
}
export default connect(mapStateToProps, { getObjects })(App);