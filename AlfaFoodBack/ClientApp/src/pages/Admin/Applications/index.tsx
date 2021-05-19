import React from "react"
import { NavLink } from "react-router-dom";

import "./index.scss"
import Application from "../Application";


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
                    {
                        applications.map((i) => (
                            <ApplicationItem name={i} id={i}/>
                        ))
                    }
                </div>
                <div>
                    <Application />
                </div>
            </div>
        </div>
    )
}


export default Applications