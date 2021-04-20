import {BaseThunkType, InferActionsType} from "../store";
import { Action } from "redux";
import {authAPI} from "../../api/auth-api";


type LoggedInUserType = {
    role?: string,
}

let initialState = {
    login: null as (string | null),
    email: null as (string | null),
    loggedInUser: null as (LoggedInUserType | null)
}

export const actions = {
    setAuthUserData: (loggedInUser: {} | null)  => ({
      type: "Auth/SET_USER_DATA",
      payload: { loggedInUser }
    } as const)
}


export const getCurrentUser = (): ThunkType => async (dispatch) => {
    try {
        let loggedInUser = await authAPI.currentUser()
        dispatch(actions.setAuthUserData(loggedInUser))
    } catch {
        console.log('error')
    }
}

export const login = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        let loggedInUser = await authAPI.login(email,password)
        if (loggedInUser) {
            dispatch(actions.setAuthUserData(loggedInUser))
        }
    } catch {
        console.log('error')
    }
}

export const register = (email: string, password: string, phone: string, username: string): ThunkType => async (dispatch) => {
    try {
        let loggedInUser = await authAPI.register(email,password,phone,username)
        if (loggedInUser) {
            dispatch(actions.setAuthUserData(loggedInUser))
        }
    } catch {
        console.log('error')
    }
}




const authReducer = ( state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'Auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}





export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>