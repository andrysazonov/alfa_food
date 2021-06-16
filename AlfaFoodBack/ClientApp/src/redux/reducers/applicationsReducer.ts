import {BaseThunkType, InferActionsType} from "../store";
import {Dispatch} from "redux";
import {applicationAPI} from "../../api/application-api";

type ApplicationItemType = {
    title: string,
    id: string,
    date: string
}

let initialState = {
    applicationsList: [
        {
            title: 'Ресторан Креветки',
            id: '123122',
            date: '2014.12.12 15:12'
        },
        {
            title: 'Ресторан Креветки1',
            id: '123124',
            date: '2014.12.12 15:12'
        },
        {
            title: 'Ресторан Креветки33',
            id: '123125',
            date: '2014.12.12 15:12'
        },
    ]
}


export const actions = {
    setApplicationsList: (applications: ApplicationItemType[] | null) => ({
        type: "Restaurant/SET_APPLICATION_LIST",
        payload: applications as ApplicationItemType[]
    } as const)
}

export const confirmApplication = (data: any): ThunkType => async (dispatch : Dispatch) => {
    console.log('post confirm application')
    let res = await applicationAPI.confirmApplication(data);
    console.log('res.status', res.status)
}



const applicationReducer = ( state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "Restaurant/SET_APPLICATION_LIST":
            return {
                ...state,
                // applicationsList: action.payload
            }
        default:
            return state
    }
}





export default applicationReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>