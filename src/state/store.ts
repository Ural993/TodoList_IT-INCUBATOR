import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type StoreType = ReturnType<typeof rootReducer>



// @ts-ignore
window.store = store