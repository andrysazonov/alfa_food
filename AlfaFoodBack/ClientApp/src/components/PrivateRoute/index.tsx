import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {  CafeAdminLayout, AdminLayout } from "../../router/layouts";

type PrivateRouteType = {
    loggedInUser: any,
    // component: React.ComponentType
}

const PrivateRoute: React.FC<PrivateRouteType> = ({loggedInUser, ...rest}) => (
    <Route
        render={() => {
            if (loggedInUser.role === 'admin') {
                return (
                    <AdminLayout  />
                );
            }
            if (loggedInUser.role === 'cafeadmin' ) {
                return (
                    <CafeAdminLayout />
                );
            }

            return (
                <Redirect
                    to={{ pathname: "/guest" }}
                />
            )
        }}
    />
)

export default PrivateRoute;