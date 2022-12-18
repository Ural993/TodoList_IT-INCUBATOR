import {combineReducers} from "redux";
import {todolistsReducer} from "./reducers/todolists-reducer";
import {tasksReducer} from "./reducers/tasks-reducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers/login-reducer";
import { appReducer } from "./reducers/app-reducer";

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