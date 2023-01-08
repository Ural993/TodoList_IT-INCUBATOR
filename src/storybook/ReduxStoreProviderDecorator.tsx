import React, { ReactElement } from 'react';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { v1 } from 'uuid';

import { appReducer } from '../state/reducers/app-reducer';
import { loginReducer } from '../state/reducers/login-reducer';
import { tasksReducer } from '../state/reducers/tasks-reducer';
import { todolistsReducer } from '../state/reducers/todolists-reducer';

const rootReduser = combineReducers({
  task: tasksReducer,
  todolist: todolistsReducer,
  auth: loginReducer,
  app: appReducer,
});

const initialGlobalState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all' },
  ],

  tasks: {
    todolistId1: [
      { id: v1(), title: 'HTML&CSS', status: 0 },
      { id: v1(), title: 'JS', status: 0 },
    ],
    todolistId2: [
      { id: v1(), title: 'Milk', status: 0 },
      { id: v1(), title: 'React Book', status: 0 },
    ],
  },
};

export const storybookStore = createStore(rootReduser, initialGlobalState as any);

export const ReduxStoreProviderDecorator = (story: any): ReactElement => {
  return <Provider store={storybookStore}>{story()}</Provider>;
};
