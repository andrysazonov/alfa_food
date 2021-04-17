import React from "react"
import useDocumentTitle from "../../hooks/useDocumentTitle";

const GuestPage: React.FC = () => {

    useDocumentTitle("Гостевая страница")

    return (
        <div>
            Guest Page
        </div>
    )
}


export default GuestPage;