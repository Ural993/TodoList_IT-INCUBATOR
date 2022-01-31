import axios from "axios";

const initial = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})
export const todoApi = {
    getTodolists: () => {
        return initial.get('todo-lists')
    },
    getTasks: (todolistId: string) => {
        return initial.get(`todo-lists/${todolistId}/tasks`)
    }
}