import React, {useState, ChangeEvent, useEffect, SyntheticEvent} from "react"
import InputMask from "react-input-mask"
import {InjectedFormProps, reduxForm, Field, formValues} from "redux-form"
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import {useDispatch, useSelector} from "react-redux";


import { getISOHoursMinutsTime } from "../../../utils/diff"
import ImagePreview from "../../../components/ImagePreview";
import {required, validateEmail, validatePhone, timeHoursAndMinutes} from "../../../utils/validators";
import { days } from "../../../utils/diff"
import { addEstablishment } from "../../../redux/reducers/restaurantReducer";


import "./index.scss"
import {AppStateType} from "../../../redux/store";



interface INewEstablishmentFormProps {
    onSubmit: (e : SyntheticEvent) => void
}



const FieldFileInput  = (props: any) => {

    const onChange = (e: any) => {
        const { input: { onChange } } = props
        console.log('onchange field file :: ',  e.target.files[0])
        onChange(e.target.files[0])
    }

    const { input: { value } } = props
    const { label, meta: { touched, error }} = props
    return(
        <div

        >
            <label
                className="new-establishment-form__file-label"
            >{label}</label>
            <div
                className="new-establishment-form__file-field"
            >
                <div>
                    <input
                        className="new-establishment-form__file-input"
                        type='file'
                        accept='.jpg, .png, .jpeg'
                        onChange={onChange}
                    />
                </div>
                {touched && error && <span  className="new-establishment-form__file-error">{error}</span> }
            </div>

            <ImagePreview image={value}/>
        </div>
    )
}





const renderTimeField = ({
                             input,

                             meta: { touched, error }
                         }: any) => (
    <div>
        <div>
            <InputMask
                {...input}
                className={`pickerTime__input  ${touched && error ? "pickerTime__input--error" : ""}`}
                mask={"99:99"}
            />
        </div>
    </div>
)



const renderInputField = ({
                         input,
                         label,
                         type,
                         placeholder,
                         meta: { touched, error, warning }
                     }: any) => (
    <div>
        <div className="new-establishment-form__field">
            <input
                {...input}
                placeholder={placeholder}
                type={type}
                className="new-establishment-form__input"
            />
            {touched &&
            ((error && <span className="new-establishment-form__error">{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const renderTextareaField = ({
                                 input,
                                 type,
                                 placeholder,
                                 meta: { touched, error, warning }
                             }: any) => (
    <div>
        <div className="new-establishment-form__field-textarea">
            <textarea
                cols="20"
                rows="6"
                {...input}
                placeholder={placeholder}
                type={type}
                className="new-establishment-form__textarea"
            />
            {touched &&
            ((error && <span className="new-establishment-form__error">{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

type dayTimes = [string, string]

export type AddEstablishmentFormValuesType = {
    name: string,
    phone: string,
    address: string,
    businessId: string
    days: [dayTimes]
}

type AddEstablishmentFormOwnProps = {
    onSubmit: (data: AddEstablishmentFormValuesType) => void
}


const AddEstablishmentForm: React.FC<InjectedFormProps<AddEstablishmentFormValuesType, AddEstablishmentFormOwnProps> & AddEstablishmentFormOwnProps> = (props) => {


    const { pristine, submitting, handleSubmit, onSubmit, change} = props;
    useDocumentTitle('Добавление заведения')

    return (

        //@ts-ignore
        <form onSubmit={handleSubmit(onSubmit)} >
            <h3 className="new-establishment__small-title">Основные данные</h3>
            <div className="new-establishment-form__inputs">
                <Field
                    placeholder="Название"
                    name="name"
                    component={renderInputField}
                    type="text"
                    validate={[required]}
                />
                <Field
                    placeholder="Почта"
                    name="email"
                    component={renderInputField}
                    type="text"
                    validate={[required, validateEmail]}
                />
                <Field
                    placeholder="БизнесИД"
                    name="restaurantId"
                    component={renderInputField}
                    type="text"
                    validate={[required]}
                />
                <Field
                    placeholder="Телефон"
                    name="phone"
                    component={renderInputField}
                    type="text"
                    validate={[required, validatePhone]}
                />
                <Field
                    placeholder="Описание"
                    name="description"
                    component={renderTextareaField}
                    type="text"
                    validate={[required]}
                />
                <Field
                    placeholder="Адресс"
                    name="address"
                    component={renderInputField}
                    type="text"
                    validate={[required]}
                />
                <Field
                    placeholder="Город"
                    name="city"
                    component={renderInputField}
                    type="text"
                    validate={[required]}
                />

            </div>
            <div className="new-establishment-form__pickerTime" >
                    <h3
                        className="new-establishment__small-title"
                    >Время работы</h3>
                    <div
                        className="pickerTime__wrapper"
                    >
                        {
                            days.map((day) => (
                                <div
                                    className="pickerTime__date"
                                >
                            <span
                                className="pickerTime__day"
                            >{day}</span>
                                    <Field
                                        name={`day-start-${day}`}
                                        component={renderTimeField}
                                        type="text"
                                        validate={[required, timeHoursAndMinutes]}
                                    />
                                    <Field
                                        name={`day-end-${day}`}
                                        component={renderTimeField}
                                        type="text"
                                        validate={[required, timeHoursAndMinutes]}
                                    />
                                </div>
                            ))
                        }

                    </div>
                </div>
            <div
                className="new-establishment-form__file-wrapper"
            >
                <h3 className="new-establishment__small-title">Выберите карту помещения</h3>
                <Field
                    name={`image-map`}
                    component={FieldFileInput}
                    validate={[required]}
                />

            </div>


            <button
                type="submit"
                className="new-establishment-form__btn"
                disabled={pristine || submitting}
            >ДОБАВИТЬ</button>
        </form>
    )
}


//@ts-ignore
const AddEstablishmentReduxForm = reduxForm<AddEstablishmentFormValuesType, AddEstablishmentFormOwnProps>({form: "add-establishment"})(AddEstablishmentForm)



const AddEstablishment = () => {
    const dispatch = useDispatch()
    const user_id = useSelector((state: AppStateType) => state.auth.loggedInUser.id)


    const onSubmit = (data: AddEstablishmentFormValuesType) => {
        let new_data = {
            workingTime: [
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ],
            userId: user_id
        }
        for (let i in data) {
            if (i.startsWith('day')) {
                //@ts-ignore
                if (i.includes("start")) {
                    let day = i.slice(-2)
                    //@ts-ignore
                    // print(days[day])
                    new_data.workingTime[days.indexOf(day)][0] = data[i]
                } else if (i.includes("end")) {
                    let day = i.slice(-2)
                    //@ts-ignore
                    new_data.workingTime[days.indexOf(day)][1] = data[i]
                }

            } else {
                //@ts-ignore
                new_data[i] = data[i]
            }
        }
        dispatch(addEstablishment(new_data))
    }

    return (
        <div
            className="new-establishment__section"
        >
            <h1
                className="new-establishment__title"
            >Добавление нового заведения</h1>
            <AddEstablishmentReduxForm onSubmit={onSubmit} />
        </div>
    )
}



export default AddEstablishment