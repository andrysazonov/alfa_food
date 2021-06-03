import {restaurantAPI} from "../../api/restaurant-api";
import {BaseThunkType, InferActionsType} from "../store";

//
type EstablishmentItemType = {
    title: string,
    id: string
}


export type EstablishmentType = {
    common: {
        name: string,
        description: string,
        address: string,
        email: string,
        businessId: string,
        daysWork: [string, string][]
    }
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
    ],
    // currentEstablishment: null as EstablishmentType | null
    currentEstablishment: {
        name: "F123213123",
        description: "diofffsdfsdf",
        address: "here",
        daysWork: [
            ['11:11', '12:11'],
            ['11:11', '12:11'],
            ['11:11', '12:11'],
            ['11:11', '12:11'],
            ['11:11', '12:11'],
            ['11:11', '12:11'],
            ['11:11', '12:11'],
        ]
    }
}


export const actions = {

    setCurrentRestaurant: (establishment: EstablishmentType | null) => ({
        type: "Restaurant/SET_CURRENT_RESTAURANT",
        payload: establishment
    } as const),
    setEstablishmentsList: (establishments: EstablishmentItemType[] | null)  => ({
        type: "Restaurant/SET_RESTAURANT_DATA",
        payload: { establishments }
    } as const)
}



export const getEstablishment = (establishmentId: string): ThunkType => async (dispatch) => {
    try {
        let data = await restaurantAPI.getRestaurant(establishmentId) as EstablishmentType
        dispatch(actions.setCurrentRestaurant(data))
    } catch(e) {
        console.log('error is: ', e)
    }

}

export const addEstablishment = (data : any, image: any): ThunkType => async (dispatch) => {
    try {
        let id =  await restaurantAPI.addRestaurant(data)
        let byid = restaurantAPI.addRestaurantImage(image)
        console.log('good add establ...')
        // dispatch(actions.setCurrentRestaurant(data))
    } catch(e) {
        console.log('error when add est is: ', e)
    }

}




const restaurantReducer = ( state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'Restaurant/SET_RESTAURANT_DATA':
            return {
                ...state,
                ...action.payload
            }
        case "Restaurant/SET_CURRENT_RESTAURANT":
            return {
                ...state,
                //@ts-ignore
                currentRestaurant: action.payload
            }
        default:
            return state
    }
}

export default restaurantReducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>