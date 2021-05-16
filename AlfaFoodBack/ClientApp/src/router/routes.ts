// Auth
import Login from "../components/Login"
import Register from "../components/Register"
import NotFound from "../components/common/NotFound"
import GuestPage from "../components/GuestPage";


// Admin
import AdminStatistics from "../components/AdminStatistics"
import {HomePage} from "../components/HomePage"

//Cafe Admin
import CafeAdminStatistics from "../components/CafeAdminStatistics"
import AccountSettingsPage from "../page/AccountSettings";
// Cafe Owner
import RestaurantRegistrationPage from "../page/RestaurantRegistration";


export const authRoutes = [
    {
        path: "/guest",
        exact: true,
        component: GuestPage
    },
    {
        path: "/login",
        exact: false,
        component: Login
    },
    {
        path: "/register",
        exact: false,
        component: Register
    },
    {
        path: "/404",
        exact: false,
        component: NotFound
    }
]

export const adminRoutes = [
    {
        path: "/home",
        exact: true,
        component: HomePage
    },
    {
        path: "/statistics",
        exact: true,
        component: AdminStatistics
    },
    {
        path: "/accountsettings",
        exact: true,
        component: AccountSettingsPage
    },
    {
        path: "/404",
        exact: false,
        component: NotFound
    }
]
export const cafeOwnerRoutes=[
    {
        path: "/",
        exact: true,
        component: GuestPage
    },
    {
        path: "/addRestaurants",
        exact: false,
        component: RestaurantRegistrationPage
    },
]


export const cafeAdminRoutes = [
    {
        path: "/",
        exact: true,
        component: GuestPage
    },
    {
        path: "/statistics",
        exact: false,
        component: CafeAdminStatistics
    },
    {
        path: "/404",
        exact: false,
        component: NotFound
    }

]