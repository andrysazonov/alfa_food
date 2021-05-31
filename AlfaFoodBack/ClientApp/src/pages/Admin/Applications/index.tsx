import React from "react"
import { Switch, Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Application from "../Application";
import "./index.scss"
import {AppStateType} from "../../../redux/store";
import Establishment from "../../CafeAdmin/Establishment";
import AddEstablishment from "../../CafeAdmin/AddEstablishment";



const applications = [
    "1", "2", "3", "4"
]


interface IApplicationItemProps {
    name: string,
    id: string
}

const ApplicationItem = ({name, id} : IApplicationItemProps) => {

    return (
        <NavLink
            className="application-item__link"
            activeClassName="application-item__link--active"
            to={`/application/${id}`}
            style={{textDecoration: "none"}}
        >
            <div
                className="application-item__wrapper"
            >
                <h3>{name}</h3>
            </div>
        </NavLink>
    )
}




interface IApplicationsProps {

}




const Applications = () => {

    const applicationsItems = useSelector((state: AppStateType) => state.applications.applicationsList)


    return (
        <div
            className="applications__content"
        >
            <div
                className="applications__container"
            >
                <div
                    className="applications__list applications-list"
                >
                    <h1
                        className="applications-list__title"
                    >
                        Заявки
                    </h1>
                    <div>
                        {
                            applicationsItems && applicationsItems[0] && applicationsItems.map((app: any) => (
                                <ApplicationItem name={app.title} id={app.id}/>
                            ))
                        }
                    </div>

                </div>
                <div>
                    <Switch>
                        <Route path="/application/:id" render={({match}) =>
                        {
                            const {id} = match.params;
                            //@ts-ignore
                            return <Application id={id} />
                        }}
                        />
                    </Switch>

                </div>
            </div>
        </div>
    )
}


export default Applications