import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Services
import AuthService from "./connection/auth.service";

// Components
import Login from "./components/auth/Login";
import TopNav from "./components/shared/TopNav";
import Sidebar from "./components/shared/Sidebar";
import Dashboard from "./components/content/Dashboard";
import Artwork from "./components/artwork/Artwork";

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
                <Route exact path={'/'}>
                    <Login />
                </Route>
            ) : (
            <div>
                <TopNav />
                <Sidebar userInfo={currentUser} />
                
                <div className="switch-wrapper">
                    <Switch>
                        <Route exact path={"/"} component={Dashboard} />
                        <Route path = {'/artwork'} component = {Artwork}/>
                    </Switch>
                </div> 
            </div> 
            )}
        </Router>
    );
}
export default App;