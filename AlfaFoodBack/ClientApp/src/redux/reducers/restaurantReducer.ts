import {restaurantAPI} from "../../api/restaurant-api";
import {BaseThunkType, InferActionsType} from "../store";

//
type EstablishmentItem = {
    title: string,
    id: string
}

let initialState = {
    establishmentsList: [
        {
            title: "Заведение Криветка",
            id: "krivetka1"
        },
        {
            title: "Заведение  Rare Криветка",
            id: "rarekrivetka1"
        }
    ]
}


export const actions = {
    // setAuthUserData: (loggedInUser: {} | null)  => ({
    //   type: "Restaurant/SET_RESTAURANT_DATA",
    //   payload: { loggedInUser }
    // } as const)
    setEstablishmentsList: (establishments: EstablishmentItem[] | null)  => ({
        type: "Restaurant/SET_RESTAURANT_DATA",
        payload: { establishments }
    } as const)
}

// export const register = (email: string, password: string, phone: string, username: string): ThunkType => async (dispatch) => {
//     try {
//         let loggedInUser = await restaurantAPI.addRestaurant(email,password,phone,username)
//         if (loggedInUser) {
//             dispatch(actions.setAuthUserData(null))
//         }
//     } catch {
//         console.log('error in register')
//     }
// }

const restaurantReducer = ( state = initialState, action: ActionsType): InitialStateType => {
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