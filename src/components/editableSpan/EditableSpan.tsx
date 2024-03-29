import React, { ChangeEvent, useState } from 'react';

import { Edit } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log('EditableSpan');
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.value);

  const activateEditMode = (): void => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = (): void => {
    setEditMode(false);
    props.onChange(title);
  };
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={title}
      onChange={onTitleChange}
      autoFocus
      onBlur={activateViewMode}
    />
  ) : (
    <span>
      {props.value}
      <IconButton onClick={activateEditMode}>
        <Edit fontSize="small" />
      </IconButton>
    </span>
  );
});
