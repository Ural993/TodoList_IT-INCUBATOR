import axios from "axios";

const initial = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers:{
        'API-KEY':'fe88c94b-7e3d-4776-912d-349e13ec1b3a'
    }
})
export const todoApi = {
    getTodolists: () => {
        return initial.get('todo-lists')
    },
    removeTodolist:(todolistId:string)=>{
        return initial.delete(`todo-lists/${todolistId}`)
    },
    addTodolist:(title:string)=>{
        return initial.post('todo-lists', {title})
    },
    changeTodolistTitle:(todolistId:string, title:string)=>{
        return initial.put(`todo-lists/${todolistId}`, {title})
    },
    getTasks: (todolistId: string) => {
        return initial.get(`todo-lists/${todolistId}/tasks`)
    },
    removeTask:(todolistId:string, taskId:string)=>{
        return initial.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    addTask:(todolistId:string, title:string)=>{
        return initial.post(`todo-lists/${todolistId}/tasks`, {title:title})
    },
    changeTask:(todolistId:string, taskId:string, data:UpdateTaskModelType)=>{
        return initial.put(`todo-lists/${todolistId}/tasks/${taskId}`, data)
    }
}
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}
export const authApi = {
    login:(params: LoginParamsType)=>{
        return initial.post<ResponseType<{userId?:number}>>('auth/login', params)
    }
}




// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}