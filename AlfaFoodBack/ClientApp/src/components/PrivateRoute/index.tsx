import React from 'react';
import { Route, Redirect } from 'react-router-dom';


type PrivateRouteType = {
    loggedInUser: any,
    // component: React.ComponentType
}

const PrivateRoute: React.FC<PrivateRouteType> = ({loggedInUser, ...rest}) => {



    return (
         loggedInUser ? <Redirect to="/" /> : <div>werer</div>
    )
}

export default PrivateRoute;