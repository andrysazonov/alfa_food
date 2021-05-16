import React from "react"
import { Route, Switch, Redirect } from "react-router-dom";

import { authRoutes, adminRoutes, cafeAdminRoutes, cafeOwnerRoutes } from "./routes"

export const AuthLayout = () => {
    // console.log("PubRout")

   return( <>
        <Switch>
            {authRoutes.map((route, index) => (
                <Route key={index} {...route}/>
            ))}
            <Redirect to="/guest" />
        </Switch>

    </>)
}



export const AdminLayout = () => {
    // console.log("234234")
    return(<>
        <Switch>
            {adminRoutes.map((route, index) => (
                <Route key={index} {...route}/>
            ))}
            <Redirect to="/home" />
        </Switch>
    </>
    )
            }

export const CafeAdminLayout = () => (
    <>
        <Switch>
            {cafeAdminRoutes.map((route, index) => (
                <Route {...route}/>
            ))}
            <Redirect to="/404" />
        </Switch>
    </>
)

export const CafeOwnerLayout = () => (
    <>
        <Switch>
            {cafeOwnerRoutes.map((route, index) => (
                <Route {...route}/>
            ))}
            <Redirect to="/404" />
        </Switch>
    </>
)