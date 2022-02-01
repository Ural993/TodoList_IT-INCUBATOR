import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsACType,
    todolistId1,
    todolistId2
} from "./todolistsReducer";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todoApi, UpdateTaskModelType} from "../api/api";
import {AppRootStateType} from "./store";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    task:TaskType
}
type changeTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
type changeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

const initialState: TasksStateType = {}
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | changeTaskStatusAC
    | changeTaskTitleAC
    | AddTodolistActionType | RemoveTodolistActionType | setTodolistsACType | setTasksACType
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task}, ...state[action.task.todoListId]]
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)]
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)]
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.data.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: [...action.tasks]}
        default :
            return state
    }

}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (task:TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusAC => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleAC => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}
type setTasksACType = ReturnType<typeof setTasksAC>

export const getTasks = (todolistId: string) => (dispatch: Dispatch) => {
    todoApi.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todoApi.addTask(todolistId, title)
        .then((res) => {
            if(res.data.resultCode ===0){
                dispatch(addTaskAC(res.data.data.item))

            }
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todoApi.removeTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
            }
        })
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        let data: UpdateTaskModelType = {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        todoApi.changeTaskTitle(todolistId, taskId, data)
            .then((res)=>{
                dispatch(changeTaskTitleAC(taskId,title,todolistId))
            })
    }
}