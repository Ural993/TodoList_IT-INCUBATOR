/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from 'react';

import { action } from '@storybook/addon-actions';

import { EditableSpan } from './EditableSpan';

export default {
  title: 'EditableSpan',
  component: EditableSpan,
};
const callback = action('Value changed');

export const EditableSpanBaseExample = (props: any): ReactElement => {
  return <EditableSpan {...props} value="Start value" onChange={callback} />;
};
