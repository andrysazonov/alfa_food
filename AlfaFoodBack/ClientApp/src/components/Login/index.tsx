import React from 'react'
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { InjectedFormProps, reduxForm, Field} from "redux-form"
import { required } from "../../utils/validators";

import {login} from '../../redux/reducers/authReducer'


import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";

type LoginFormOwnProps = {
    onSubmit: (data: LoginFormValuesType) => void
}

const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error, warning }
                     }: any) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps>  & LoginFormOwnProps> = (props) => {

    const { pristine, submitting, handleSubmit, onSubmit} = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>
                <Field
                    name="email"
                    component={renderField}
                    type="text"
                    validate={[required]}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field
                    name="password"
                    component={renderField}
                    type="text"
                    validate={[required]}
                />
            </div>
            <button type="submit" disabled={pristine || submitting}>Login</button>
        </form>


    )
}

export type LoginFormValuesType = {
    email: string
    password: string,
}

// type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

//@ts-ignore
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "loginForm"})(LoginForm)


const LoginPage: React.FC = () => {

    useDocumentTitle("Вход")

    const dispatch = useDispatch()

    const onSubmit = (data: LoginFormValuesType) => {
        dispatch(login(data.email, data.password))
    }

    return (
        <>
            <h3>Войдите в систему</h3>
            <p>У вас еще нет <Link to="/register">аккаунта</Link></p>
            <LoginReduxForm onSubmit={onSubmit} />
        </>

    )
}

export default LoginPage