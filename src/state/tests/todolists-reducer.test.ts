import { v1 } from 'uuid';

import { FilterValuesType } from '../../App';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from '../reducers/todolists-reducer';

test('correct todolist should be removed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: Array<TodolistDomainType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(
    startState,
    removeTodolistAC({ todolistId: todolistId1 }),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const newTodolistTitle = 'New Todolist';

  const startState: Array<TodolistDomainType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(
    startState,
    addTodolistAC({ title: newTodolistTitle, id: v1() }),
  );

  // eslint-disable-next-line no-magic-numbers
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const newTodolistTitle = 'New Todolist';

  const startState: Array<TodolistDomainType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC({ title: newTodolistTitle, todolistId: todolistId2 }),
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const newFilter: FilterValuesType = 'completed';

  const startState: Array<TodolistDomainType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC({ filter: newFilter, todolistId: todolistId2 }),
  );

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
