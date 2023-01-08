import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { AddCircleOutline } from '@material-ui/icons';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log('AddItemForm called');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addItem = (): void => {
    if (title.trim() !== '') {
      props.addItem(title);
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  const enterKeyboardCode = 13;

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === enterKeyboardCode) {
      addItem();
    }
  };

  return (
    <div>
      <TextField
        value={title}
        size="small"
        helperText={error}
        variant="outlined"
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        // className={error ? "error" : ""}
        error={!!error}
        label="Text"
      />
      <IconButton onClick={addItem} color="primary" size="small">
        <AddCircleOutline fontSize="medium" />
      </IconButton>

      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  );
});
