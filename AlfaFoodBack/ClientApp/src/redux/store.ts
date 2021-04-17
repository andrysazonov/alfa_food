import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import {AuthReducer} from "./reducers";

let rootReducer = combineReducers({
    auth: AuthReducer
})


type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>



const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
)

export default store