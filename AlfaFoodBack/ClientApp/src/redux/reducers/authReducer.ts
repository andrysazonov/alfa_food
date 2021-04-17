
type LoggedInUserType = {
    role: string,
}

let initialState = {
    login: null as (string | null),
    email: null as (string | null),
    loggedInUser: null as (LoggedInUserType | null)
}


const authReducer = ( state = initialState, action: any) => {
    return state
}


export default authReducer;
export type InitialStateType = typeof initialState;
