import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Menu} from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Todolist from './components/Todolist';
import { TaskType } from './api/api';
import { useDispatch, useSelector } from 'react-redux';
import { getTodolists } from './state/todolistsReducer';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import { LinearProgress } from '@material-ui/core';
import ErrorSnackbar from './components/errorSnackbar/ErrorSnackbar';
import { AppRootStateType } from './state/store';
import { RequestStatusType } from './state/app-reducer';

export type FilterValuesType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export function App() {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)
    
    useEffect(() => {
        dispatch(getTodolists())
    }, [])

    console.log(<span>test</span>)

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
         {status === 'loading' && <LinearProgress color='secondary' />}
             <ErrorSnackbar/>
            </AppBar>
            <Container fixed>
                <Routes>
                  <Route path='/' element={<Todolist/>}/>
                  <Route path='login' element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}


