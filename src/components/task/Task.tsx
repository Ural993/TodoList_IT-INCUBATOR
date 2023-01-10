import React, { ChangeEvent, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';

import { TaskStatuses, TaskType } from '../../api/api';
import { EditableSpan } from '../editableSpan/EditableSpan';

type TaskPropsType = {
  removeTask: (taskId: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
  task: TaskType;
  todolistId: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onDeleteButtonClick = (): void =>
    props.removeTask(props.task.id, props.todolistId);
  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newIsDoneValue = e.currentTarget.checked;

    props.changeTaskStatus(
      props.task.id,
      newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
      props.todolistId,
    );
  };
  const onTitleChange = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },
    [props.changeTaskTitle, props.task.id, props.todolistId],
  );

  return (
    <ListItem
      divider
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
    >
      <Checkbox
        onChange={onCheckboxChange}
        checked={props.task.status === TaskStatuses.Completed}
      />
      <EditableSpan value={props.task.title} onChange={onTitleChange} />
      <IconButton onClick={onDeleteButtonClick} aria-label="delete" size="small">
        <Delete fontSize="inherit" />
      </IconButton>
    </ListItem>
  );
});
