import {BaseThunkType, InferActionsType} from "../store";
import {Dispatch} from "redux";
import {HttpTransportType, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

import {applicationAPI} from "../../api/application-api";


type ApplicationItemType = {
    title: string,
    id: string,
    date: string
}

let initialState = {
    applicationsList: [],
    hubConnection: null
}


export const actions = {
    setApplicationsList: (applications: ApplicationItemType[] | null) => ({
        type: "Restaurant/SET_APPLICATION_LIST",
        payload: applications as ApplicationItemType[]
    } as const),
    setCurrentHub: (hub: any) => ({
        type: "Applications/SET_CONNECTION",
        payload: hub
    } as const),
}

export const confirmApplication = (data: any): ThunkType => async (dispatch : Dispatch) => {
    let res = await applicationAPI.confirmApplication(data);
    // some redirect :]
}

export const connectToHub = (): ThunkType => async (dispatch: Dispatch, getState) => {
    let state = getState();

    console.log(state);

    if (state.applications.hubConnection != null) {
        console.log('Connection exists...');
        return;
    }

    const hubConnection = new HubConnectionBuilder()
        .withUrl('/applications', { transport: HttpTransportType.WebSockets})
        .configureLogging(LogLevel.Information)
        .build();

    dispatch(actions.setCurrentHub(hubConnection));

    hubConnection
        .start()
        .then(() => {
            console.log('Connection started!');
            // hubConnection.invoke("SendMessage", "userTest", "I am a test message. YEY!");
        })
        .catch(err => console.log('Error while establishing connection :('));

    hubConnection.on("ReceiveApplications", (message) => {
        // const text = `suprime ${message}`;
        console.log('socket message::: ', message);
    });

    //hubConnection.
}

export const disconnectHub = (): ThunkType => async (dispatch: Dispatch, getState) => {
    // const state = getState()
    // let hubConnection = state.applications.hubConnection
    // if (hubConnection) {
    //     // @ts-ignore
    //     // hubConnection.stop()
    // }
    dispatch(actions.setCurrentHub(null));
};


const applicationReducer = ( state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "Restaurant/SET_APPLICATION_LIST":
            return {
                ...state,
                //@ts-ignore
                applicationsList: state.applicationsList.concat(action.payload)
            }
        case "Applications/SET_CONNECTION":
            return {
                ...state,
                hubConnection: action.payload
            }
        default:
            return state
    }
}





export default applicationReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>