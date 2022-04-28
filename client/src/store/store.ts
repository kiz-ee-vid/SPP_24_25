import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import authReducer from "./reducers/auth.reducer";
import todoReducer from "./reducers/todo.reducer";

export const rootReducer = combineReducers({
    authReducer,
    todoReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
