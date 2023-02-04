import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { TaskStatuses, todoApi, UpdateTaskModelType } from '../../api/api';
import { TasksStateType } from '../../App';
import { AppRootStateType } from '../store';

import { setErrorAC, setStatusAC } from './app-reducer';
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer';

const initialState: TasksStateType = {};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
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
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state[action.payload.todolistId].push(...action.payload.tasks);
    });
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.todoListId].unshift(action.payload);
    });
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        task => task.id === action.payload.taskId,
      );

      state[action.payload.todolistId].splice(index, 1);
    });
  },
});

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC('loading'));

    return todoApi.getTasks(todolistId).then(res => {
      const tasks = res.data.items;

      thunkAPI.dispatch(setStatusAC('succeeded'));

      return { todolistId, tasks };
    });
  },
);

export const addTaskTC = createAsyncThunk(
  'tasks/addTasks',
  async (payload: { todolistId: string; title: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setStatusAC('loading'));
      const res = await todoApi.addTask(payload.todolistId, payload.title);

      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setStatusAC('succeeded'));

        return res.data.data.item;
      }
      if (res.data.messages.length) {
        thunkAPI.dispatch(setErrorAC(res.data.messages[0]));
      } else {
        thunkAPI.dispatch(setErrorAC('Some error occurred!'));
      }
    } catch (error) {
      console.log('error in addTaskTC');
    } finally {
      thunkAPI.dispatch(setStatusAC('idle'));
    }
  },
);

export const removeTaskTC = createAsyncThunk(
  'tasks/removeTaskTC',
  async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC('loading'));

    await todoApi.removeTask(payload.todolistId, payload.taskId);

    thunkAPI.dispatch(setStatusAC('idle'));

    return { taskId: payload.taskId, todolistId: payload.todolistId };
  },
);

export const tasksReducer = slice.reducer;

export const { changeTaskStatusAC, changeTaskTitleAC } = slice.actions;

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
