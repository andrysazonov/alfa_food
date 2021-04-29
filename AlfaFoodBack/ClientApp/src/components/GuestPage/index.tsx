import React from "react"
import useDocumentTitle from "../../hooks/useDocumentTitle";

import { Link } from "react-router-dom";

const GuestPage: React.FC = () => {

    useDocumentTitle("Гостевая страница")

    return (
        <div>
            Guest Page
            <Link to="/login">Войти</Link>
        </div>
    )
}


export default GuestPage;