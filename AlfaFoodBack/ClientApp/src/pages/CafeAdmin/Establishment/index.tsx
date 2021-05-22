import React, {useEffect} from "react"
import { useDispatch } from "react-redux";

import "./index.scss"

//: RouteComponentProps<MatchParams>


// interface MatchParams {
//     id: string;
// }


interface IEstablishmentProps {
    id: string;
}


const Establishment = ({ id }: IEstablishmentProps) => {

    const dispatch = useDispatch()


    useEffect(() => {
        // get establishment by id
        console.log('est ost and match: ', id)
    }, [])


    return (
        <div
            className="establishment__content"
        >
            <div>
                Заведение № {id}
            </div>
        </div>
    )
}

//@ts-ignore
export default Establishment