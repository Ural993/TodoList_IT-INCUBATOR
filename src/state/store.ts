import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";


const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type StoreType = ReturnType<typeof rootReducer>



// @ts-ignore
window.store = store