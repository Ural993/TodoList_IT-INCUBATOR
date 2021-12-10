import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistsReducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId:string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type changeTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId:string
    isDone:boolean
}
type changeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId:string
    title:string
}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | changeTaskStatusAC
    | changeTaskTitleAC
|AddTodolistActionType| RemoveTodolistActionType
export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t=> t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.todolistId]:[{id:v1(), title:action.title, isDone:false}, ...state[action.todolistId]]}

        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]:[...state[action.todolistId].map(t => t.id === action.taskId? {...t, isDone:action.isDone}:t)]}

        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todolistId]:[...state[action.todolistId].map(t => t.id === action.taskId? {...t, title:action.title}:t)]}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]:[]}
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return  newState
        default :
            return state
    }

}
export const removeTaskAC = ( taskId:string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId }
}
export const addTaskAC = (title: string, todolistId:string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean,todolistId:string): changeTaskStatusAC => {
    return {type: 'CHANGE-TASK-STATUS',taskId,isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string,todolistId:string): changeTaskTitleAC => {
    return {type: 'CHANGE-TASK-TITLE',taskId, title, todolistId}
}
