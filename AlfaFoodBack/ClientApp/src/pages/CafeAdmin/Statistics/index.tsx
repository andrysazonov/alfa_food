import React from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";


const Statistics = () => {

    useDocumentTitle("Страница статистики")

    return (
        <div
            className="content"
        >
            <div>Здесь будет статистика</div>
        </div>
    )
}


export default Statistics