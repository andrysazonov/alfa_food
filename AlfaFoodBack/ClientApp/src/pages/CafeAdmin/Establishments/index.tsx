import React, {useEffect} from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { NavLink, Switch, Route } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux";


import './index.scss'
import Establishment from "../Establishment";
import AddEstablishment from "../AddEstablishment";
import { AppStateType } from "../../../redux/store";



interface IEstablishmentItemList {
    name: string,
    id: string
}

const EstablishmentItemList = ({name = "", id} : IEstablishmentItemList) => {
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
                <h3
                    className="establishment-item__name"
                >
                    {name}
                </h3>
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


    useDocumentTitle("Заведения")
    const establishments = useSelector((state: AppStateType) => state.restaurants.establishmentsList)

    useEffect(() => {
        console.log('Заведения завелись: ', establishments)
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
                        establishments.map((est: {id: string, title: string}) => (
                            <EstablishmentItemList id={est.id} name={est.title} />
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