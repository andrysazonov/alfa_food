import React, {useEffect} from "react"
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom"
import ControlLoginBtn from "../../../components/ControlLoginBtn";



import "./index.scss"


type Link = {
    title: string,
    to: string,
    active: string[]
}

const adminLinks: Link[] = [
    {
        title: "Заведения",
        to: "/establishments",
        active: ["/establishments"],
    },
    {
        title: "Статистика",
        to: "/statistics",
        active: ["/statistics"]
    },
    {
        title: "База гостей",
        to: "/guestbase",
        active: ["/guestbase"]
    },
    {
        title: "Сотрудники",
        to: "/staff",
        active: ["/staff"]
    },
    {
        title: "Чат",
        to: "/chat",
        active: ["/chat"]
    },
]

//@ts-ignore
const onPath = (paths: string[], location) => {
    return paths.includes(location)
}




const Navbar = ({location}: RouteComponentProps) => {

    useEffect(() => {
        console.log('props: ', location)
    })

    return (
        <header className="guest-navbar__container" >
            <div className="guest-navbar__wrapper" >
                <div
                    className="guest-navbar__left"
                >
                    <div className="guest-navbar__logoWrap" >
                        <NavLink
                            to="/"
                            style={{textDecoration: "none"}}
                        >
                            <span className="logo">ALFAFOOD</span>
                        </NavLink>

                    </div>
                </div>

                <div className="guest-navbar__controls" >
                    <NavLink
                        className="guest-navbar__auth-link"
                        activeClassName="guest-navbar__auth-link--active"
                        to="login"
                        style={{textDecoration: "none"}}
                    >
                        <span>ВОЙТИ</span>
                    </NavLink>
                    <NavLink
                        className="guest-navbar__auth-link"
                        activeClassName="guest-navbar__auth-link--active"
                        to="register"
                        style={{textDecoration: "none"}}
                    >
                        <span>РЕГИСТРАЦИЯ</span>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}


export default  withRouter(Navbar)