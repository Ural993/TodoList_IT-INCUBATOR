import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { TaskStatuses, TaskType, todoApi, UpdateTaskModelType } from '../../api/api';
import { TasksStateType } from '../../App';
import { AppRootStateType } from '../store';

import { setErrorAC, setStatusAC } from './app-reducer';
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer';

const initialState: TasksStateType = {};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ taskId: string; todolistId: string }>) {
      const index = state[action.payload.todolistId].findIndex(
        task => task.id === action.payload.taskId,
      );

      state[action.payload.todolistId].splice(index, 1);
    },
    addTaskAC(state, action: PayloadAction<TaskType>) {
      state[action.payload.todoListId].unshift(action.payload);
    },
    changeTaskStatusAC(
      state,
      action: PayloadAction<{
        taskId: string;
        status: TaskStatuses;
        todolistId: string;
      }>,
    ) {
      const index = state[action.payload.todolistId].findIndex(
        task => task.id === action.payload.taskId,
      );

      state[action.payload.todolistId][index].status = action.payload.status;
    },
    changeTaskTitleAC(
      state,
      action: PayloadAction<{
        taskId: string;
        title: string;
        todolistId: string;
      }>,
    ) {
      const index = state[action.payload.todolistId].findIndex(
        task => task.id === action.payload.taskId,
      );

      state[action.payload.todolistId][index].title = action.payload.title;
    },
    setTasksAC(state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) {
      state[action.payload.todolistId].push(...action.payload.tasks);
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.forEach(todolist => {
        state[todolist.id] = [];
      });
    });
  },
});

export const tasksReducer = slice.reducer;

export const {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  setTasksAC,
} = slice.actions;

export const getTasks = (todolistId: string) => async (dispatch: Dispatch) => {
  dispatch(setStatusAC('loading'));
  const res = await todoApi.getTasks(todolistId);

  try {
    dispatch(setTasksAC({ todolistId, tasks: res.data.items }));
    dispatch(setStatusAC('succeeded'));
  } catch (error: any) {
    dispatch(setErrorAC(error.message));
  }
};

export const addTaskTC =
  (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'));
    const res = await todoApi.addTask(todolistId, title);

    try {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item));
        dispatch(setStatusAC('succeeded'));
      } else if (res.data.messages.length) {
        dispatch(setErrorAC(res.data.messages[0]));
      } else {
        dispatch(setErrorAC('Some error occurred!'));
      }
    } catch (error) {
      console.log('error in addTaskTC');
    } finally {
      dispatch(setStatusAC('idle'));
    }
  };

export const removeTaskTC =
  (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'));
    const res = await todoApi.removeTask(todolistId, taskId);

    try {
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC({ taskId, todolistId }));
      }
    } catch (error) {
      console.log('error in removeTaskTC');
    } finally {
      dispatch(setStatusAC('idle'));
    }
  };

export const changeTaskTitleTC =
  (todolistId: string, taskId: string, title: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId);

    if (task) {
      const data: UpdateTaskModelType = {
        title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      };

      todoApi.changeTask(todolistId, taskId, data).then(res => {
        const responseStatusCode = 200;

        if (res.status === responseStatusCode) {
          dispatch(changeTaskTitleAC({ taskId, title, todolistId }));
        }
      });
    }
  };

export const changeTaskStatusTC =
  (todolistId: string, taskId: string, status: TaskStatuses) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId);

    if (task) {
      const data: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      };

      todoApi.changeTask(todolistId, taskId, data).then(res => {
        const responseStatusCode = 200;

        if (res.status === responseStatusCode) {
          dispatch(changeTaskStatusAC({ taskId, status, todolistId }));
        }
      });
    }
  };
