import React from "react"
import { Route} from "react-router-dom"
import PrivateRoute from "../PrivateRoute"

type PublicRouteType = {
    loggedInUser: any,
    component: React.ComponentType
}


const PublicRoute: React.FC<PublicRouteType> = ({loggedInUser, component: Component, ...rest}) => {
    // console.log("object",loggedInUser)

    return(
    <Route render={() => (
        
        loggedInUser.role!=="none" ? <PrivateRoute loggedInUser={loggedInUser}/> : <Component {...rest}/>
    )}
   />)
}



export default PublicRoute;