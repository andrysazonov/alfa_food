import React from "react"
import { Link } from "react-router-dom"

import { ReactComponent as NotFound404 } from "../../../assets/svg/404.svg";

const NotFound = () => {
    //     const isServerError = match/..

    return (
        <div className="not-found__wrapper">
            <h1 className="not-found__title">
                Что-то пошло не так
            </h1>
            <NotFound404 />
            <Link to="/" >На Главную</Link>
        </div>
    )
}

export default NotFound