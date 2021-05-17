import React from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";


const AccountSettings = () => {

    useDocumentTitle("Настройки аккаунта")

    return (
        <div
            className="content"
        >
            <div>
                Кафе админ Account settings
            </div>
        </div>

    )
}

export default AccountSettings