/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from 'react';

import { action } from '@storybook/addon-actions';

import { AddItemForm } from './AddItemForm';

export default {
  title: 'AddItemForm',
  component: AddItemForm,
};
const callback = action('Button "add" was pressed inside the form');

export const AddItemFormBaseExample = (props: any): ReactElement => {
  return <AddItemForm {...props} addItem={callback} />;
};
