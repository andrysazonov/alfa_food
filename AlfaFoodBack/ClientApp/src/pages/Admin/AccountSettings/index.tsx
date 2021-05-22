import React from "react"
import { InjectedFormProps, reduxForm, Field } from "redux-form";
import { required} from "../../../utils/validators";


import "./index.scss"
// import {LoginFormValuesType} from "../../../components/Login";





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

type ChangePasswordFormValuesType = {
    oldPassword: string,
    newPassword: string,
    repeatPassword: string
}


const ChangePasswordForm: React.FC<InjectedFormProps<ChangePasswordFormValuesType, ChangePasswordOwnProps>  & ChangePasswordOwnProps> = (props) => {
    const { pristine, submitting, handleSubmit, onSubmit} = props;

    return (
        <div className="page-main-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Field
                        placeholder="Старый пароль"
                        name="oldPassword"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                <div>
                    <Field
                        placeholder="Новый пароль"
                        name="newPassword"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                <div>
                    <Field
                        placeholder="Повторите пароль"
                        name="repeatPassword"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                <button
                    className="primary-button"
                    type="submit"
                    disabled={pristine || submitting}
                >Изменить</button>
            </form>
        </div>
    )

}

type ChangePasswordOwnProps = {
    onSubmit: ( data: ChangePasswordFormValuesType) => void
}

//@ts-ignore
const ChangePasswordReduxForm = reduxForm<ChangePasswordFormValuesType, ChangePasswordOwnProps>({form: "AdminChangePassword"})(ChangePasswordForm)

const AccountSettings: React.FC = () => {
    return (
        <div
            className="content"
        >
            <h3>Сменить пароль</h3>
            <ChangePasswordReduxForm onSubmit={() => {}}/>
        </div>
    )
}


export default AccountSettings