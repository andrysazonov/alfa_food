import React, {useEffect} from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { NavLink, Switch, Route } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux";



import Establishment from "../Establishment";
import AddEstablishment from "../AddEstablishment";

import { AppStateType } from "../../../redux/store";
import { getEstablishmets } from "../../../redux/reducers/restaurantReducer";

import { ReactComponent as HomePicture} from "../../../assets/svg/home-delivery.svg";


import './index.scss'



interface IEstablishmentItemList {
    name: string,
    id: string,
    published: boolean
}

const EstablishmentItemList = ({name = "", id, published} : IEstablishmentItemList) => {
    return (
        <NavLink
            style={{textDecoration: "none"}}
            to={`/establishment/${id}`}
            className="establishment-item__link"
            activeClassName="establishment-item__link--active"
        >
            <div
                className="establishment-item__wrapper"
            >
                <HomePicture />
                <div className="establishment-item__content">
                    <h3
                        className="establishment-item__name"
                    >
                        {name}
                    </h3>
                    <span
                        className={`establishment-item__status ${published ? 'establishment-item__status--confirmed' : 'establishment-item__status--pending'}`}
                    >{published ? 'Опубликован' : 'В ожидании'}</span>
                </div>

            </div>
        </NavLink>
    )
}

const AddEstablishmentBtn = () => {
    return (
        <NavLink
            style={{textDecoration: "none"}}
            to={"/addestablishment"}
        >
            <div
                className="add-establishment__wrapper"
            >
                <span>Добавить заведение</span>
            </div>
        </NavLink>
    )
}



const Establishments = () => {
    const dispatch = useDispatch()
    const establishments = useSelector((state: AppStateType) => state.restaurants.establishmentsList)
    const ownerId = useSelector((state: AppStateType) => state.auth.loggedInUser.id)


    useDocumentTitle("Заведения")


    useEffect(() => {
        dispatch(getEstablishmets(ownerId))
    }, [])

    return (
        <div
            className="establishments__content"
        >
            <div className="establishments__container">
                <div className="establishments__list establishments-list">
                    <h1
                        className="establishments-list__title"
                    >Заведения</h1>
                    {
                        Array.isArray(establishments) && establishments.length && establishments.map((est: any) => (
                            <EstablishmentItemList id={est.id} name={est.name} published={est.published}/>
                        ))
                    }
                    <div className="establishments-list__btn">
                        <AddEstablishmentBtn />
                    </div>

                </div>
                <div>
                    <Switch>
                        <Route path="/establishment/:id" render={({match}) =>
                            {
                                const {id} = match.params;
                                return <Establishment id={id} />
                            }}
                        />
                        <Route path="/addestablishment" component={AddEstablishment}/>
                    </Switch>
                </div>
            </div>

        </div>
    )
}


export default Establishments