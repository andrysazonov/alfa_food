import React, {useEffect} from "react"
import { withRouter, RouteComponentProps} from "react-router";

interface MatchParams {
    id: string;
}

const Application = ({match} : RouteComponentProps<MatchParams>) => {


    // get this data application from back
    useEffect(() => {

    }, [])
    return (
        <div>
            Здесь будет ваша заявка... id ~ {match.params.id}
        </div>
    )
}



export default withRouter(Application)