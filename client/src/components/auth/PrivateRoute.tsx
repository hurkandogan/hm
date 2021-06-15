import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../connection/auth.service';

export const PrivateRoute = ({ children, ...rest }) => {
    let user = authService.getCurrentUser();
    console.log(user);
    return (
        <Route {...rest}
            render={({ location }) =>
                user.accessToken ? (
                    children
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                    />
                )
            }
        />
    );
}

