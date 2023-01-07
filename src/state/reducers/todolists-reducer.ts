import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { v1 } from 'uuid';

import { todoApi, TodolistType } from '../../api/api';
import { FilterValuesType } from '../../App';

import { setErrorAC } from './app-reducer';

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistDomainType> = [];

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};

const slice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex(
        todolist => todolist.id === action.payload.todolistId,
      );

      state.splice(index, 1);
    },
    addTodolistAC(state, action: PayloadAction<TodolistType>) {
      state.unshift({ ...action.payload, filter: 'all' });
    },
    changeTodolistTitleAC(
      state,
      action: PayloadAction<{ title: string; todolistId: string }>,
    ) {
      const index = state.findIndex(
        todolist => todolist.id === action.payload.todolistId,
      );

      state[index].title = action.payload.title;
    },
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ filter: FilterValuesType; todolistId: string }>,
    ) {
      const index = state.findIndex(
        todolist => todolist.id === action.payload.todolistId,
      );

      state[index].filter = action.payload.filter;
    },
    setTodolistsAC(state, action: PayloadAction<TodolistType[]>) {
      return action.payload.map(todolist => ({
        ...todolist,
        filter: 'all',
      }));
    },
  },
});

export const {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
  changeTodolistFilterAC,
} = slice.actions;

export const todolistsReducer = slice.reducer;

export const getTodolists = () => (dispatch: Dispatch) => {
  return todoApi.getTodolists().then(res => {
    dispatch(setTodolistsAC(res.data));
  });
};

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  return todoApi.removeTodolist(todolistId).then(res => {
    const responseStatusCode = 200;

    if (res.status === responseStatusCode) {
      dispatch(removeTodolistAC({ todolistId }));
    }
  });
};

export const addTodolistTC = (title: string) => async (dispatch: Dispatch) => {
  try {
    const res = await todoApi.addTodolist(title);

    dispatch(addTodolistAC(res.data.data.item));
  } catch (e: any) {
    dispatch(setErrorAC(e.message));
  }
};
export const changeTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    return todoApi.changeTodolistTitle(todolistId, title).then(res => {
      const responseStatusCode = 200;

      if (res.status === responseStatusCode) {
        dispatch(changeTodolistTitleAC({ title, todolistId }));
      }
    });
  };
