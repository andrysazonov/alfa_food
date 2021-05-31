import {BaseThunkType, InferActionsType} from "../store";
// import { Action } from "redux";
import { authAPI } from "../../api/auth-api";
import { SubmissionError } from 'redux-form'

type LoggedInUserType = {
    role?: string,
}

let initialState = {
    login: null as (string | null),
    email: null as (string | null),
    loggedInUser: { role: "owner"} as LoggedInUserType
}


export const actions = {
    setAuthUserData: (loggedInUser: {} | null)  => ({
      type: "Auth/SET_USER_DATA",
      payload: { loggedInUser }
    } as const),
    logOut: () => ({
        type: "LOG_OUT"
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

    let loggedInUser = await authAPI.login(email,password)
    console.log('LOGIN DATA: ', loggedInUser)
    if (loggedInUser) {
        dispatch(actions.setAuthUserData(loggedInUser))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    // console.log('log utttt')
    let resp = await authAPI.logout()
    if (resp) {
        dispatch(actions.logOut())
    }
}



export const register = (email: string, password: string, phone: string, username: string): ThunkType => async (dispatch) => {
    try {
        let loggedInUser = await authAPI.register(email,password,phone,username)
        if (loggedInUser) {
            dispatch(actions.setAuthUserData(loggedInUser))
        }
    } catch {
        console.log('error in register')
    }
}




const authReducer = ( state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'Auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'LOG_OUT':
            return {
                ...state,
                ...initialState
            }
        default:
            return state
    }
}





export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>