import React from "react"


import alfaMobileGif from "../../../../assets/gifs/alfa-mobile.gif"

import "./index.scss"

const AboutMobile = () => {
    return (
        <section className="aboutMobileSection__section">
            <div className="content">
                <h3 className="aboutMobileSection__title">Мобильное приложение для физ.лиц</h3>
                <div className="aboutMobileSection__content">
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, similique!</p>
                    </div>
                    <div className="aboutMobileSection__img-wrap">
                        <img
                            src={alfaMobileGif}
                            alt="alfa-mobile-gif"
                            height={"550px"}

                        />
                    </div>
                </div>

            </div>
        </section>
    )
}


export default AboutMobile