import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from './redux/actions/userLogin';
import authService from './connection/auth.service';

// Components
import { PrivateRoute } from './components/auth/PrivateRoute';
import Login from "./components/auth/Login";
import TopNav from "./components/shared/TopNav";
import Sidebar from "./components/shared/Sidebar";
import Dashboard from "./components/content/Dashboard";
import Artwork from "./components/artwork/Artwork";

function App() {

    const [loggedUser, setLoggedUser] = useState({});

    const getUser = async () => setLoggedUser(authService.getCurrentUser());

    //const loggedUser = useSelector(state => state.loggedUser);
    //const dispatch = useDispatch();
    
    useEffect(() => {
        getUser();
        //dispatch(userLogin({ mail: "dogan.hurkan@gmail.com", password: "admin" }));
        console.log(loggedUser);
    }, [])

    return (
        <Router>
            <div>
                { loggedUser.accessToken && <TopNav /> }
                { loggedUser.accessToken && < Sidebar /> }
                
                <div className="switch-wrapper">
                    <Switch>
                        <Route exact path={'/login'} component={Login} />
                        
                        <PrivateRoute exact path={"/"}>
                            <Dashboard />    
                        </PrivateRoute>

                        <PrivateRoute path={'/artwork'}>
                            <Artwork />
                        </PrivateRoute>
                    </Switch>
                </div> 
            </div> 
        </Router>
    );
}
export default App;