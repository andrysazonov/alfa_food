import React from 'react'
import useDocumentTitle from "../../hooks/useDocumentTitle";


const LoginForm: React.FC = () => {
    return (
        <div>Login Page</div>
    )
}

const LoginPage: React.FC = () => {

    useDocumentTitle("Вход")

    return (

        <div>Войдите в систему</div>
    )
}

export default LoginPage