import React, {useState, ChangeEvent, useEffect, SyntheticEvent} from "react"
import InputMask from "react-input-mask"
import { InjectedFormProps, reduxForm, Field} from "redux-form"
import useDocumentTitle from "../../../hooks/useDocumentTitle";




import ImageUpload from "../../../components/ImageUpload";


import "./index.scss"


interface INewEstablishmentFormProps {
    onSubmit: (e : SyntheticEvent) => void
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





function TimeInput() {
    const [time, setTime] = useState('')
    const startsWithTwo = time[0] === '2'

    // @ts-ignore
    const handleInput = ({ target: { value } }) => setTime(value)

    const mask = `
        /[0-2]/,
        startsWithTwo ? /[0-3]/ : /[0-9]/,
        ':',
        /[0-5]/,
        /[0-9]/
    `
    const mask2 = [
        /[0-2]/
    ]
    return (
        <InputMask
            className="pickerTime__input"
            mask={"99:99"}
            onChange={handleInput}
            value={time}
        />
    )
}
const days = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Вс",
]



const NewEstablishmentForm: React.FC<INewEstablishmentFormProps> = (props) => {
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        address: '',
        businessId: ''
    })
    useEffect(() => {
        console.log('formState - ', Object.keys(formState))
    }, [])


    const { onSubmit } = props

    const changeHandler = (e: any) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        setFormState(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const placeholders = {
        name: "Название",
        phone: "Телефон",
        businessId: "Бизнес ID",
        address: "Адресс"
    }

    useDocumentTitle('Добавление заведения')


    return (
        <form onSubmit={onSubmit} >
            <div className="new-establishment-form__inputs">
                {   Object.keys(formState).map((key) => (
                    <div>

                        <input
                            type="text"
                            name={key}
                            //@ts-ignore
                            placeholder={placeholders[key]}
                            //@ts-ignore
                            value={formState[`${key}`]}
                            onChange={changeHandler}
                            className="new-establishment-form__input"
                        />
                        <div>error</div>
                    </div>
                    ))
                }


                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    name="businessId"*/}
                    {/*    placeholder="Бизнес ID"*/}
                    {/*    value={formState.businessId}*/}
                    {/*    onChange={changeHandler}*/}
                    {/*    className="new-establishment-form__input"*/}
                    {/*/>*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    name="address"*/}
                    {/*    placeholder="Адресс"*/}
                    {/*    value={formState.address}*/}
                    {/*    onChange={changeHandler}*/}
                    {/*    className="new-establishment-form__input"*/}
                    {/*/>*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    name="phone"*/}
                    {/*    placeholder="Телефон"*/}
                    {/*    value={formState.phone}*/}
                    {/*    onChange={changeHandler}*/}
                    {/*    className="new-establishment-form__input"*/}
                    {/*/>*/}
            </div>
            <div className="new-establishment-form__pickerTime" >
                    <h3
                        className="new-establishment-form__title"
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
                                    <TimeInput />
                                    <TimeInput />
                                </div>
                            ))
                        }

                    </div>
                </div>
            <div
                className="new-establishment-form__file-input"
            >
                <h3>Выберите карту помещения</h3>
                <ImageUpload />
            </div>


            <button
                type="submit"
                className="new-establishment-form__btn"
            >ДАЛЕЕ</button>
        </form>
    )
}





const AddEstablishment = () => {

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        console.log('Next..')
    }

    return (
        <div
            className="new-establishment__section"
        >
            <h1
                className="new-establishment__title"
            >Добавление нового заведения</h1>
            <NewEstablishmentForm onSubmit={onSubmit} />
        </div>
    )
}



export default AddEstablishment