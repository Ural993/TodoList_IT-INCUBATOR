import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) =>{
    console.log('EditableSpan')
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        : <span >{props.value}
            <IconButton onClick={activateEditMode}>
                <Edit fontSize={"small"}/>
            </IconButton>
    </span>
})
