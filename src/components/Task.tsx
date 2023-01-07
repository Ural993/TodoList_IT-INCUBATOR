import React, { ChangeEvent, useCallback } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { Delete } from '@material-ui/icons';

import { TaskStatuses, TaskType } from '../api/api';

import { EditableSpan } from './EditableSpan';

type TaskPropsType = {
  removeTask: (taskId: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  task: TaskType;
  id: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = (): void => props.removeTask(props.task.id, props.id);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const newIsDoneValue = e.currentTarget.checked;

    props.changeTaskStatus(
      props.task.id,
      newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
      props.id,
    );
  };
  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.id);
    },
    [props.changeTaskTitle, props.task.id, props.id],
  );

  return (
    <ListItem
      divider
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
    >
      <Checkbox
        onChange={onChangeHandler}
        checked={props.task.status === TaskStatuses.Completed}
      />
      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler} aria-label="delete" size="small">
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  );
});
