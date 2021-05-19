import React from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { NavLink, Switch, Route } from "react-router-dom"

import './index.scss'
import Establishment from "../Establishment";
import AddEstablishment from "../AddEstablishment";



const establishments = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
]


interface IEstablishmentItemList {
    name: string,
    id: number
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
        <NavLink to={"/addestablishment"} >
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
                        establishments.map((i) => (
                            <EstablishmentItemList id={i} name={`Заведение № ${i}`} />
                        ))
                    }
                    <AddEstablishmentBtn />
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