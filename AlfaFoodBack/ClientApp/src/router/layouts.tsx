import React from "react"
import { Route, Switch, Redirect } from "react-router-dom";

import { authRoutes, adminRoutes, cafeAdminRoutes } from "./routes"

export const AuthLayout = () => (
    <>
        <Switch>
            {authRoutes.map((route, index) => (
                <Route {...route}/>
            ))}
            <Redirect to="/guest" />
        </Switch>

    </>
)



export const AdminLayout = () => (
    <>
        <Switch>
            {adminRoutes.map((route, index) => (
                <Route {...route}/>
            ))}
            <Redirect to="/404" />
        </Switch>
    </>
)

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
