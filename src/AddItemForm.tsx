
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AddCircleOutline } from '@material-ui/icons';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField value={title}
            helperText={error}
            variant='outlined'
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            //className={error ? "error" : ""}
            error={!!error}
            label='Text'
        />
        <IconButton onClick={addItem} color='primary' size="small">
            <AddCircleOutline />
        </IconButton>

        {/* {error && <div className="error-message">{error}</div>} */}
    </div>
}
