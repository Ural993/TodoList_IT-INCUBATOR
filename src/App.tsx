import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Menu} from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
    AddTodolistAC, addTodolistTC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, changeTodolistTitleTC, getTodolists, removeTodolistTC, TodolistDomainType,
} from "./state/todolistsReducer";
import {
    addTaskTC,
    changeTaskStatusAC, changeTaskStatusTC,
    changeTaskTitleTC,
    removeTaskTC
} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatuses, TaskType, TodolistType} from './api/api';
import {AppRootStateType} from "./state/store";
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';

export type FilterValuesType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export function App() {
    useEffect(() => {
        dispatch(getTodolists())
    }, [])

    console.log(<span>test</span>)

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [])

    const changeStatus = useCallback((id: string, isDone: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusTC(todolistId, id, isDone))
    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleTC(todolistId, id, newTitle))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        let action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title))
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {/*<LinearProgress color="secondary" />*/}
            <Container fixed>
                <Grid container>
                    <Grid style={{padding: '10px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>

                        {
                            todolists.map(tl => {
                                let tasksForTodolist = tasks[tl.id];
                                return <Grid item key={tl.id}>
                                    <Paper elevation={3} style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />

                                    </Paper>
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}


