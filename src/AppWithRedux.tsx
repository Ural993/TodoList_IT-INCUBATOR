import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
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
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppWithRedux() {

    console.log('App is called')

    const dispatch = useDispatch()

    const todolists = useSelector<StoreType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<StoreType, TasksStateType>(state => state.tasks)

    const addTask = useCallback((title: string, todolistId: string)=> {
        let action = addTaskAC(title, todolistId)
        dispatch(action)
    },[])

    const removeTask = useCallback((id: string, todolistId: string) =>{
        let action = removeTaskAC(id, todolistId)
        dispatch(action)
    },[])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) =>{
        let action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    },[])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) =>{
        let action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    },[])

    const addTodolist = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((id: string)=> {
        let action = RemoveTodolistAC(id)
        dispatch(action)
    },[])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string)=> {
        let action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
    },[])

    const changeTodolistTitle = useCallback((id: string, title: string)=> {
        let action = ChangeTodolistTitleAC(title, id)
        dispatch(action)
    },[])

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


