import { Action, applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import { reducer as formReducer } from "redux-form"


import { AuthReducer, RestaurantReducer } from "./reducers";

let rootReducer = combineReducers({
    //@ts-ignore
    auth: AuthReducer,
    restaurants: RestaurantReducer,
    form: formReducer
})


type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsType<T> = T extends { [keys : string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
)

export default store