/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from 'react';

import { action } from '@storybook/addon-actions';

import { Task } from './Task';

export default {
  title: 'Task',
  component: Task,
};
const changeTaskTitleСallback = action('Title changed');
const changeTaskStatusСallback = action('Status changed');
const removeTaskСallback = action('Task was removed');

export const TaskBaseExample = (props: any): ReactElement => {
  return (
    <>
      <Task
        task={{ id: 'taskId1', title: 'Js', status: 2 }}
        changeTaskTitle={changeTaskTitleСallback}
        changeTaskStatus={changeTaskStatusСallback}
        removeTask={removeTaskСallback}
        {...props}
        todolistId="todolistId1"
      />
      <Task
        task={{ id: 'taskId2', title: 'CSS', status: 0 }}
        changeTaskTitle={changeTaskTitleСallback}
        changeTaskStatus={changeTaskStatusСallback}
        removeTask={removeTaskСallback}
        {...props}
        todolistId="todolistId2"
      />
    </>
  );
};
