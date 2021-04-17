import Login from "../components/Login"
import Register from "../components/Register"
import NotFound from "../components/common/NotFound"
import GuestPage from "../components/GuestPage";


export const authRoutes = [
    {
        path: "/",
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