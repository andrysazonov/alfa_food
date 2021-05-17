import React, {useEffect} from "react"


//: RouteComponentProps<MatchParams>


// interface MatchParams {
//     id: string;
// }


interface IEstablishmentProps {
    id: string;
}


const Establishment = ({ id }: IEstablishmentProps) => {

    useEffect(() => { console.log('est ost and match: ', id)}, [])
    return (
        <div
            className="content"
        >
            <div>
                Заведение № {id}
            </div>
        </div>
    )
}

//@ts-ignore
export default Establishment