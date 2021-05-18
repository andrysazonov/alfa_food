import React from "react"
import { Route, Switch, Redirect } from "react-router-dom";

import { authRoutes, adminRoutes, cafeAdminRoutes } from "./routes"

import CafeAdminNavbar from "../pages/CafeAdmin/Navbar"
import AdminNavbar from "../pages/Admin/Navbar"
import GuestNavbar from "../pages/Guest/Navbar"



export const AuthLayout = () => {


   return (
       <>
           <GuestNavbar />
            <Switch>
                {authRoutes.map((route, index) => (
                    <Route key={index} {...route}/>
                ))}
                <Redirect to="/guest" />
            </Switch>
        </>
   )
}



export const AdminLayout = () => {
    return(
    <>
        <AdminNavbar />
        <Switch>
            <Redirect
                exact
                from="/home"
                to="/applications"
            />
            {adminRoutes.map((route, index) => (
                <Route key={index} {...route}/>
            ))}
            <Redirect to="/404" />
        </Switch>
    </>
    )
            }

export const CafeAdminLayout = () => (
    <>
        <CafeAdminNavbar />
        <Switch>
            <Redirect
                exact
                from="/"
                to="/establishments"
            />
            {cafeAdminRoutes.map((route, index) => (
                <Route {...route}/>
            ))}
            <Redirect to="/404" />
        </Switch>
    </>
)

// export const CafeOwnerLayout = () => (
//     <>
//         <Switch>
//             {cafeOwnerRoutes.map((route, index) => (
//                 <Route {...route}/>
//             ))}
//             <Redirect to="/404" />
//         </Switch>
//     </>
// )