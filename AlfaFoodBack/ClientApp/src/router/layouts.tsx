import React from "react"
import { Route, Switch, Redirect } from "react-router-dom";

import { authRoutes } from "./routes"

export const AuthLayout = () => (
    <>
        <Switch>
            {authRoutes.map((route, index) => (
                <Route {...route}/>
            ))}
            <Redirect to="/404" />
        </Switch>

    </>
)



export const AdminLayout = () => (
    <>

    </>
)
