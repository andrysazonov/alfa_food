import React from 'react'
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useDispatch } from "react-redux";
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import { required } from "../../utils/validators";


type RegisterFormOwnProps = {
    onSubmit: (data: any) => void
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




const RegisterForm: React.FC<InjectedFormProps<RegisterFormValuesType,RegisterFormOwnProps> & RegisterFormOwnProps> = (props) => {
    const { pristine, submitting, handleSubmit, onSubmit, error} = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Имя и Фамилия</label>
                <Field
                    name="name"
                    component={renderField}
                    type="text"
                    validate={[required]}
                />
            </div>
            <div>
                <label htmlFor="phone">Телефон</label>
                <Field
                    name="phone"
                    component={renderField}
                    type="text"
                    validate={[required]}
                />
            </div>
            <div>
                <label htmlFor="email">Почта</label>
                <Field
                    name="email"
                    component={renderField}
                    type="text"
                    validate={[required]}
                />
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <Field
                    name="password"
                    component={renderField}
                    type="text"
                    validate={[required]}
                />
            </div>
            <button type="submit" disabled={pristine || submitting}>Register</button>
        </form>
    )
}

type RegisterFormValuesType = {
    name: string,
    phone: number,
    email: string,
    password: string
}


const RegisterReduxForm = reduxForm<RegisterFormValuesType, RegisterFormOwnProps>({form: "registerForm"})(RegisterForm)


const Register: React.FC = () => {


    useDocumentTitle("Регистрация")

    const dispatch = useDispatch()


    const onSubmit = ( data: RegisterFormValuesType) => {
        console.log(`register with data : ${data.phone}`)
    }

    return (
        <>
            <h3>Register Page</h3>
            <RegisterReduxForm onSubmit={onSubmit} />
        </>
    )
}


export default Register