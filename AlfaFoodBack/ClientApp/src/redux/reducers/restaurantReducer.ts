import {restaurantAPI} from "../../api/restaurant-api";
import {BaseThunkType, InferActionsType} from "../store";



let initialState = {
    login: null as (string | null),
    email: null as (string | null),
    loggedInUser: { role: "cafeowner"} 
    // as LoggedInUserType
}


export const actions = {
    setAuthUserData: (loggedInUser: {} | null)  => ({
      type: "Restaurant/SET_RESTAURANT_DATA",
      payload: { loggedInUser }
    } as const)
}

export const register = (email: string, password: string, phone: string, username: string): ThunkType => async (dispatch) => {
    try {
        let loggedInUser = await restaurantAPI.addRestaurant(email,password,phone,username)
        if (loggedInUser) {
            dispatch(actions.setAuthUserData(   ))
        }
    } catch {
        console.log('error in register')
    }
}

const restaurantReducer = ( state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'Restaurant/SET_RESTAURANT_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default restaurantReducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>