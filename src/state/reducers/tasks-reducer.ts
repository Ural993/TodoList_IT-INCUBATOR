import { TasksStateType } from "../../App";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  setTodolistsACType,
} from "./todolists-reducer";
import { Dispatch } from "redux";
import {
  TaskStatuses,
  TaskType,
  todoApi,
  UpdateTaskModelType,
} from "../../api/api";
import { AppRootStateType } from "../store";
import { setErrorAC, setStatusAC } from "./app-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};
type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
};
type changeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  isDone: TaskStatuses;
};
type changeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

const initialState: TasksStateType = {};
type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | changeTaskStatusActionType
  | changeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | setTodolistsACType
  | setTasksACType;
export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.taskId
        ),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          { ...action.task },
          ...state[action.task.todoListId],
        ],
      };

    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todolistId]: [
          ...state[action.todolistId].map((t) =>
            t.id === action.taskId
              ? {
                  ...t,
                  status: action.isDone,
                }
              : t
          ),
        ],
      };

    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: [
          ...state[action.todolistId].map((t) =>
            t.id === action.taskId
              ? {
                  ...t,
                  title: action.title,
                }
              : t
          ),
        ],
      };
    case "ADD-TODOLIST":
      return { ...state, [action.todolistId]: [] };
    case "REMOVE-TODOLIST":
      let newState = { ...state };
      delete newState[action.id];
      return newState;
    case "SET-TODOLISTS": {
      const stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }
    case "SET-TASKS":
      return { ...state, [action.todolistId]: [...action.tasks] };
    default:
      return state;
  }
};
export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todolistId, taskId };
};
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: "ADD-TASK", task };
};
export const changeTaskStatusAC = (
  taskId: string,
  isDone: TaskStatuses,
  todolistId: string
): changeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): changeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, title, todolistId };
};
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
  return { type: "SET-TASKS", todolistId, tasks } as const;
};
type setTasksACType = ReturnType<typeof setTasksAC>;

export const getTasks = (todolistId: string) => async (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  const res = await todoApi.getTasks(todolistId);
  try {
    dispatch(setTasksAC(todolistId, res.data.items));
    dispatch(setStatusAC("succeeded"));
  } catch (error: any) {
    dispatch(setErrorAC(error.message));
  }
};

export const addTaskTC =
  (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC("loading"));
    const res = await todoApi.addTask(todolistId, title);
    try {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item));
        dispatch(setStatusAC("succeeded"));
      } else {
        if (res.data.messages.length) {
          dispatch(setErrorAC(res.data.messages[0]));
        } else {
          dispatch(setErrorAC("Some error occurred!"));
        }
      }
    } catch (error) {
      console.log("error in addTaskTC");
    } finally {
      dispatch(setStatusAC("idle"));
    }
  };

export const removeTaskTC =
  (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC("loading"));
    const res = await todoApi.removeTask(todolistId, taskId);
    try {
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(taskId, todolistId));
      }
    } catch (error) {
      console.log("error in removeTaskTC");
    } finally {
      dispatch(setStatusAC("idle"));
    }
  };

export const changeTaskTitleTC =
  (todolistId: string, taskId: string, title: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let task = getState().tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      let data: UpdateTaskModelType = {
        title: title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      };
      todoApi.changeTask(todolistId, taskId, data).then((res) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId));
      });
    }
  };

export const changeTaskStatusTC =
  (todolistId: string, taskId: string, status: TaskStatuses) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let task = getState().tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      let data: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      };
      todoApi.changeTask(todolistId, taskId, data).then((res) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId));
      });
    }
  };
