import React, { useCallback, useEffect } from 'react';

import { Delete } from '@mui/icons-material';
import { Button, IconButton, List, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { TaskStatuses, TaskType } from '../api/api';
import { FilterValuesType } from '../App';
import { getTasks } from '../state/reducers/tasks-reducer';

import { AddItemForm } from './addItemForm/AddItemForm';
import { EditableSpan } from './editableSpan/EditableSpan';
import { Task } from './task/Task';

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: TaskStatuses, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
};

export const TodolistItem = React.memo((props: PropsType) => {
  console.log('Todolist is called');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getTasks(props.id));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id],
  );

  const removeTodolist = (): void => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title);
    },
    [props.changeTodolistTitle, props.id],
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter('all', props.id),
    [props.changeFilter, props.id],
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter('active', props.id),
    [props.changeFilter, props.id],
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.id),
    [props.changeFilter, props.id],
  );

  let tasksForTodolist = props.tasks;

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New);
  }
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <Typography align="center" variant="h6" style={{ fontWeight: 'bold' }}>
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} aria-label="delete" size="small">
          <Delete fontSize="inherit" />
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTask} />
      <List>
        {tasksForTodolist.map(task => (
          <Task
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
            todolistId={props.id}
            removeTask={props.removeTask}
            task={task}
            key={task.id}
          />
        ))}
      </List>
      <div>
        <Button
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
