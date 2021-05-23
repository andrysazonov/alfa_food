import React from "react"

import "./index.scss"

const RepresentationSection = () => {
    return (
        <div
            className="representationSection__wrapper"
        >
            <div
                className="representationSection__text-part"
            >
                <h3
                    className="representationSection__title"
                >
                    Сервис бронирования столов<br /> и бесплатная книга резервов
                </h3>
                <p
                    className="representationSection__descr"
                >
                    Онлайн приём броней, депозиты, статистика, база гостей, банкеты.<br /> Настраивается за 15 минут, работает в облаке.<br /> Стоит от 0 руб. в месяц
                </p>
                <button
                    className="representationSection__btn"
                >НАЧАТЬ БЕСПЛАТНО</button>

                <div
                    className="representationSection__apps"
                >
                    <h4
                        className="representationSection__apps-title"
                    >Приложение для физ.лиц:</h4>
                    <div
                        className="representationSection__apps-wrap"
                    >
                        <div
                            className="representationSection__apps-link"
                        >
                            <img src="https://static.tildacdn.com/tild6265-3562-4532-b532-333638303934/playmarket.svg" alt="google-playmarket"/>
                        </div>
                        <div
                            className="representationSection__apps-link"
                        >
                            <img src="https://static.tildacdn.com/tild6430-6330-4037-b763-383661623363/appstore.svg" alt="apple-playmarket" />
                        </div>
                    </div>

                </div>
            </div>
            <div
                className="representationSection__imgs"
            >
                <img src="https://camo.githubusercontent.com/bb9893b301e2c2040905901ef751832d85d8223390465c6bb8e4b5d296d5133c/68747470733a2f2f737065652e63682f406c6272793a33662f616e64726f69642d30382d686f6d65706167652e676966" alt="11"/>
            </div>
        </div>
    )
}

export default RepresentationSection