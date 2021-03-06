import React from "react"
import { InjectedFormProps, reduxForm, Field } from "redux-form";
import { required} from "../../../utils/validators";

import ChangePasswordReduxForm from "../../common/ChangePassword";
import "./index.scss"



const AccountSettings: React.FC = () => {
    return (
        <div
            className="content"
        >
            <h3>Сменить пароль</h3>
            <ChangePasswordReduxForm onSubmit={() => {}} formName={"AdminAccountSettings"}/>
        </div>
    )
}


export default AccountSettings