import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from "@material-ui/core/Typography";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <Typography align={"center"} variant={'h6'} style={{fontWeight:'bold'}}> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist} aria-label="delete" size="small">
                <Delete fontSize="inherit" />
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTask} />
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <ListItem divider={true} key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} />
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler} aria-label="delete" size="small">
                            <Delete fontSize="inherit" />
                        </IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button color='primary' variant={props.filter === 'active' ? "contained" : "text"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button color='secondary' variant={props.filter === 'completed' ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


