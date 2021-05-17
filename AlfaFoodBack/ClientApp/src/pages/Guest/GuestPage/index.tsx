import React from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";


import "./index.scss"


const GuestPage: React.FC = () => {

    useDocumentTitle("Гостевая страница")

    return (
        <div
            className="content"
        >
            <div className="guest__container">
                <h3 className="guest__title">Начать работу с нами легко!</h3>

            </div>

        </div>
    )
}


export default GuestPage;