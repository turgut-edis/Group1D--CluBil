import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import { authenticationService } from '../_services/authentication.service';

export const PrivateRoute = ({ element: Component, roles, ...rest }) => {
    console.log("XD");
    return(
        <Route {...rest} render={props => {
            const currentUser = authenticationService.currentUserValue;
            if (!currentUser) {
                // not logged in so Navigate to login page with the return url
                return <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // check if route is restricted by role
            if (roles && roles.indexOf(currentUser.role) === -1) {
                // role not authorised so Navigate to home page
                return <Navigate to={{ pathname: '/' }} />
            }

            // authorised so return component
            return <Component {...props} />
        }} />
    );
}