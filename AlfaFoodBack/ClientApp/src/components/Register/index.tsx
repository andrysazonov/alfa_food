import React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { InjectedFormProps, reduxForm, Field } from "redux-form";
import { register } from "../../redux/reducers/authReducer";

import { required } from "../../utils/validators";
import normalizePhone from "../../utils/normalize";
import "./index.scss";

type RegisterFormOwnProps = {
  onSubmit: (data: any) => void;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
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
);

const RegisterForm: React.FC<
  InjectedFormProps<RegisterFormValuesType, RegisterFormOwnProps> &
    RegisterFormOwnProps
> = (props) => {
  const { pristine, submitting, handleSubmit, onSubmit } = props;

  return (
    
      <div className="page-main-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username">Имя и Фамилия</label>
            <Field
              name="username"
              component={renderField}
              type="text"
              validate={[required]}
            />
          </div>
          <div>
            <label htmlFor="phone">Телефон</label>
            <Field
              placeholder={"NNN-NNN-NNNN"}
              name="phone"
              component={renderField}
              type="text"
              validate={[required]}
              normalize={normalizePhone}
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
          <button type="submit" disabled={pristine || submitting}>
            Register
          </button>
        </form>
      </div>
    
  );
};

type RegisterFormValuesType = {
  username: string;
  phone: string;
  email: string;
  password: string;
};

const RegisterReduxForm = reduxForm<
  RegisterFormValuesType,
  RegisterFormOwnProps
>({ form: "registerForm" })(RegisterForm);

const Register: React.FC = () => {
  useDocumentTitle("Регистрация");

  const dispatch = useDispatch();

  const onSubmit = (data: RegisterFormValuesType) => {
    dispatch(register(data.email, data.password, data.phone, data.username));
  };

  return (
    <>
      <div className="page-form">
        <h1>Регистрация</h1>
        <p>
          У вас уже есть <Link to="/login">аккаунт</Link>
        </p>
        <RegisterReduxForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default Register;
