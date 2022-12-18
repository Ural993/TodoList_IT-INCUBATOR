import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todoApi, TodolistType} from "../api/api";
import { setErrorAC } from "./app-reducer";

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

const initialState: Array<TodolistDomainType> = []
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodolistsACType
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => (t.id === action.id ? {...t, title: action.title} : t))
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => (t.id === action.id ? {...t, filter: action.filter} : t))
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({
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
export const AddTodolistAC = (todo: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: todo.title, todolistId: todo.id}
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>

export const getTodolists = () => (dispatch: Dispatch) => {
    return todoApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    return todoApi.removeTodolist(todolistId)
        .then((res) => {
            dispatch(RemoveTodolistAC(todolistId))
        })
}

export const addTodolistTC = (title: string) => async (dispatch: Dispatch) => {
    try {
        const res = await todoApi.addTodolist(title)
        dispatch(AddTodolistAC(res.data.data.item))
    }
    catch (e:any){
        dispatch(setErrorAC(e.message))
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    return todoApi.changeTodolistTitle(todolistId, title)
        .then((res) => {
            dispatch(ChangeTodolistTitleAC(title, todolistId))
        })
}

