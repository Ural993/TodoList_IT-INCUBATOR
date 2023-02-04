// /* eslint-disable no-magic-numbers */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TasksStateType } from '../../App';
// import {
//   tasksReducer,
//   addTaskAC,
//   changeTaskStatusAC,
//   changeTaskTitleAC,
//   removeTaskTC,
// } from '../reducers/tasks-reducer';
// import { addTodolistAC } from '../reducers/todolists-reducer';

// test('correct task should be deleted from correct array', () => {
//   const startState: TasksStateType = {
//     todolistId1: [
//       { id: '1', title: 'CSS', todoListId: 'todolistId1' },
//       { id: '2', title: 'JS', todoListId: 'todolistId1' },
//       { id: '3', title: 'React', todoListId: 'todolistId1' },
//     ],
//     todolistId2: [
//       { id: '1', title: 'bread', todoListId: 'todolistId2' },
//       { id: '2', title: 'milk', todoListId: 'todolistId2' },
//       { id: '3', title: 'tea', todoListId: 'todolistId2' },
//     ],
//   };

//   const action = removeTaskTC.fulfilled(
//     { taskId: '2', todolistId: 'todolistId2' },
//     'requestId',
//     { taskId: '2', todolistId: 'todolistId2' },
//   );

//   const endState = tasksReducer(startState, action);

//   expect(endState).toEqual({
//     todolistId1: [
//       { id: '1', title: 'CSS', todoListId: 'todolistId1' },
//       { id: '2', title: 'JS', todoListId: 'todolistId1' },
//       { id: '3', title: 'React', todoListId: 'todolistId1' },
//     ],
//     todolistId2: [
//       { id: '1', title: 'bread', todoListId: 'todolistId2' },
//       { id: '3', title: 'tea', todoListId: 'todolistId2' },
//     ],
//   });
// });

// test('correct task should be added to correct array', () => {
//   const startState: TasksStateType = {
//     todolistId1: [
//       { id: '1', title: 'CSS', todoListId: 'todolistId1' },
//       { id: '2', title: 'JS', todoListId: 'todolistId1' },
//       { id: '3', title: 'React', todoListId: 'todolistId1' },
//     ],
//     todolistId2: [
//       { id: '1', title: 'bread', todoListId: 'todolistId2' },
//       { id: '2', title: 'milk', todoListId: 'todolistId2' },
//       { id: '3', title: 'tea', todoListId: 'todolistId2' },
//     ],
//   };

//   const action = addTaskAC({ title: 'juce', id: '4', todoListId: 'todolistId2' });

//   const endState = tasksReducer(startState, action);

//   expect(endState.todolistId1.length).toBe(3);
//   expect(endState.todolistId2.length).toBe(4);
//   expect(endState.todolistId2[0].id).toBeDefined();
//   expect(endState.todolistId2[0].title).toBe('juce');
// });

// test('status of specified task should be changed', () => {
//   const startState: TasksStateType = {
//     todolistId1: [
//       { id: '1', title: 'CSS', todoListId: 'todolistId1', status: 0 },
//       { id: '2', title: 'JS', todoListId: 'todolistId1', status: 0 },
//       { id: '3', title: 'React', todoListId: 'todolistId1', status: 0 },
//     ],
//     todolistId2: [
//       { id: '1', title: 'bread', todoListId: 'todolistId2', status: 0 },
//       { id: '2', title: 'milk', todoListId: 'todolistId2', status: 0 },
//       { id: '3', title: 'tea', todoListId: 'todolistId2', status: 0 },
//     ],
//   };

//   const action = changeTaskStatusAC({
//     taskId: '2',
//     status: 1,
//     todolistId: 'todolistId2',
//   });

//   const endState = tasksReducer(startState, action);

//   expect(endState.todolistId2[1].status).toBe(1);
//   expect(endState.todolistId1[1].status).toBe(0);
// });

// test('title of specified task should be changed', () => {
//   const startState: TasksStateType = {
//     todolistId1: [
//       { id: '1', title: 'CSS', todoListId: 'todolistId1' },
//       { id: '2', title: 'JS', todoListId: 'todolistId1' },
//       { id: '3', title: 'React', todoListId: 'todolistId1' },
//     ],
//     todolistId2: [
//       { id: '1', title: 'bread', todoListId: 'todolistId2' },
//       { id: '2', title: 'milk', todoListId: 'todolistId2' },
//       { id: '3', title: 'tea', todoListId: 'todolistId2' },
//     ],
//   };

//   const action = changeTaskTitleAC({
//     taskId: '2',
//     title: 'juce',
//     todolistId: 'todolistId2',
//   });

//   const endState = tasksReducer(startState, action);

//   expect(endState.todolistId2[1].title).toBe('juce');
//   expect(endState.todolistId1[1].title).toBe('JS');
// });

// test('new array should be added when new todolist is added', () => {
//   const startState: TasksStateType = {
//     todolistId1: [
//       { id: '1', title: 'CSS', todoListId: 'todolistId1' },
//       { id: '2', title: 'JS', todoListId: 'todolistId1' },
//       { id: '3', title: 'React', todoListId: 'todolistId1' },
//     ],
//     todolistId2: [
//       { id: '1', title: 'bread', todoListId: 'todolistId2' },
//       { id: '2', title: 'milk', todoListId: 'todolistId2' },
//       { id: '3', title: 'tea', todoListId: 'todolistId2' },
//     ],
//   };

//   const action = addTodolistAC({ id: '4', title: 'new todolist' });

//   const endState = tasksReducer(startState, action);

//   const keys = Object.keys(endState);
//   const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');

//   if (!newKey) {
//     throw Error('new key should be added');
//   }

//   expect(keys.length).toBe(3);
//   expect(endState[newKey]).toEqual([]);
// });
