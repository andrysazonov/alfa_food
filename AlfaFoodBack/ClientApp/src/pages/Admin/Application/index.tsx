import React, {ChangeEvent, useEffect, useState} from "react"
import { withRouter, RouteComponentProps} from "react-router";

import "./index.scss"


interface MatchParams {
    id: string;
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
            // console.log('pathTags --- ' ,pathTags[0])
            // console.log('svgData --- ' ,svgData)
            setSvgData(String(svgData))
            // console.log('docccc ::', doc)
            // console.log('svgData   ::', svgData)
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
    return (
        <section className="adminApplication__section">

            <h3>Здесь будет ваша заявка... id ~ {match.params.id}</h3>
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
            >

            </div>
        </section>
    )
}



export default withRouter(Application)