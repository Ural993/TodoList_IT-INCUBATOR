import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../components/login/loginReducer";
import { appReducer } from "./app-reducer";

const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer,
        auth: loginReducer,
        app: appReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
        reducer:rootReducer,
        middleware:  (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>



// @ts-ignore
window.store = store