import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todoApi} from "../api/api";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistType> = []
type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodolistsACType
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => (t.id === action.id ? {...t, title: action.title} : t))
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => (t.id === action.id ? {...t, filter: action.filter} : t))
        case 'SET-TODOLISTS':
            return action.data.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        default :
            return state
    }

}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (data: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', data} as const
}
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>

export const getTodolists = () => (dispatch: Dispatch) => {
    return todoApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}