import React from "react"
import { Route, Redirect } from "react-router-dom"
import PrivateRoute from "../PrivateRoute";

type PublicRouteType = {
    loggedInUser: any,
    component: React.ComponentType
}


const PublicRoute: React.FC<PublicRouteType> = ({loggedInUser, component: Component, ...rest}) => (
    <Route render={() => (
        loggedInUser ? <Redirect to="/" /> : <Component {...rest}/>
    )}
   />
)



export default PublicRoute;