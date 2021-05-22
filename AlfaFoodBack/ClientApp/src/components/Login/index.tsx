import React from 'react'
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {InjectedFormProps, reduxForm, Field, SubmissionError} from "redux-form"
import { required } from "../../utils/validators";

import {actions, login} from '../../redux/reducers/authReducer'

import "./index.scss"

import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import {authAPI} from "../../api/auth-api";

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
        <div className="form-field">
            <input {...input} placeholder={label} type={type} />
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps>  & LoginFormOwnProps> = (props) => {

    const {error, pristine, submitting, handleSubmit, onSubmit} = props;
    return (
        <div className="page-main-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {/*<label htmlFor="email">Email</label>*/}
                    <Field
                        placeholder="Почта"
                        name="email"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                <div>
                    {/*<label htmlFor="password">Password</label>*/}
                    <Field
                        placeholder="Пароль"
                        name="password"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                Здесь будет ваша ошибка {error && <span> {error}</span>}
                <button
                    className="primary-button"
                    type="submit"
                    disabled={pristine || submitting}
                >Login</button>
            </form>
        </div>
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

    const onSubmit = async (data: LoginFormValuesType) => {
        let { email, password} = data
        dispatch(login(email, password))

        // try {
        //     let loggedInUser = await authAPI.login(email,password)
        //     console.log('loggedInUserwewwewewe')
        //     if (loggedInUser) {
        //         await dispatch(actions.setAuthUserData(loggedInUser))
        //     }
        // } catch(e) {
        //     throw new SubmissionError(e)
        //     console.log('error in login')
        // }
    }

    return (
        <div
        >
            <div
                className="page-form "
            >
                <h1>Войдите в систему</h1>
                <p>У вас еще нет <Link to="/register">аккаунта</Link></p>
                <LoginReduxForm onSubmit={onSubmit} />
            </div>

        </div>

    )
}

export default LoginPage