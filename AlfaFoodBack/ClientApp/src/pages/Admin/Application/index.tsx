import React, {ChangeEvent, useEffect, useState} from "react"
import { withRouter, RouteComponentProps} from "react-router";
import { Link } from "react-router-dom"

import { ReadonlyFieldTextarea, ReadonlyFieldInput, ReadonlyFieldTime} from "../../common/components/Fields";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { days as daysName } from "../../../utils/diff"

import "./index.scss"



interface MatchParams {
    id: string;
}

interface IApplicationProps {
    data?: {
        name: string,
        description: string,
        address: string,
        email: string,
        businessId: string,

    }
}

const fakeData = {
    name: "F12",
    description: "descriptionnnnn",
    address: "Vilonova street",
    email: "f123d",
    businessId: "f213",
    daysWork: [
        ['11:11', '12:11'],
        ['11:11', '12:11'],
        ['11:11', '12:11'],
        ['11:11', '12:11'],
        ['11:11', '12:11'],
        ['11:11', '12:11'],
        ['11:11', '12:11'],
    ]
}

const Application = ({match} : RouteComponentProps<MatchParams>) => {
    const [svgData, setSvgData] = useState('')
    const [pathTagg, setPathTag] = useState(null)



    const handleFiles = (files: any) => {
        console.log(files)
        let reader = new FileReader();

        reader.onload = function(e: ProgressEvent<FileReader>) {
            //@ts-ignore
            var svgData = e.target.result;
            var parser = new DOMParser();
            //@ts-ignore
            var doc = parser.parseFromString(svgData, "image/svg+xml");
            var pathTags = doc.getElementsByTagName("path");
            if (pathTags[0]) {
                //@ts-ignore
                setPathTag(pathTags[0])
            }

            var svgTags = doc.getElementsByTagName("svg");
            setSvgData(String(svgData))

        }
        reader.readAsText(files[0]);
    }



    useEffect(() => {
        if (pathTagg) {
            //@ts-ignore
            pathTagg.addEventListener("click", function(e){
                console.log('chaaaaaaaaaaaaange')
            });
            console.log('ff12  --', pathTagg)

        }
        return () => {}
    }, [pathTagg])


    useDocumentTitle("Заявки")


    return (
        <section className="adminApplication__section">

            <h3>Заявка  № {match.params.id}</h3>

            <div className="adminApplication__form">
                <div className="adminApplication__form-block">
                    <h4 className="adminApplication__small-title">Основные данные</h4>
                    <ReadonlyFieldInput
                        value={fakeData.name}
                        label="Название"
                        type="text"
                    />
                    <ReadonlyFieldInput
                        value={fakeData.businessId}
                        label="БизнесИД"
                        type="text"
                    />
                    <ReadonlyFieldInput
                        value={fakeData.address}
                        label="Адресс"
                        type="text"
                    />
                    <ReadonlyFieldTextarea
                        value={fakeData.description}
                        label="Описание"
                        type="text"
                    />
                </div>
                <div
                    className="adminApplication__form-block"
                >
                    <h4 className="adminApplication__small-title">Время работы</h4>
                    <div
                        className="adminApplication-pickerTime__wrapper"
                    >
                        { fakeData.daysWork.map((day: any, i:number) => (
                            <div
                                className="adminApplication-pickerTime__date"
                            >
                                <span>{daysName[i]}</span>
                                <ReadonlyFieldTime value={"12"} />
                                <ReadonlyFieldTime value={"13"} />
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="adminApplication__form-block"
                >
                    <p>plan.jpg</p>
                </div>
            </div>


            <div
                className="adminApplication__confirmation"
            >
                <div
                    className="adminApplication__marking-tables"
                >

                    <input
                        type="file"
                        id="file-input"
                        accept="image/svg+xml"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
                    />
                    {/*@ts-ignore*/}
                    <div
                        className="adminApplication__content"
                        dangerouslySetInnerHTML={{__html: svgData}}
                    ></div>


                </div>
                <div>
                    <button>СОХРАНИТЬ</button>
                    <Link to={"/chat"}>
                        <button>ПЕРЕЙТИ В ЧАТ</button>
                    </Link>

                </div>

            </div>

        </section>
    )
}



export default withRouter(Application)