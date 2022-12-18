import React, {useEffect} from 'react';
import './App.css';
import Todolist from './components/Todolist';
import { TaskType } from './api/api';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import { CircularProgress, Grid, LinearProgress } from '@material-ui/core';
import ErrorSnackbar from './components/errorSnackbar/ErrorSnackbar';
import { AppRootStateType } from './state/store';
import { initializedAppTC, RequestStatusType } from './state/app-reducer';
import { Avatar, Button, Col, Layout, Row, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { logoutTC } from './state/login-reducer';

export type FilterValuesType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export function App() {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state=> state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state=> state.auth.isLoggedIn)
    
    useEffect(() => {
      dispatch(initializedAppTC())
    }, [])

    if(!isInitialized){
        return <div style={{width:'100%', position:'fixed', top: '50%', textAlign:'center'}}><CircularProgress /> </div>
    }

    const logOut = () =>{
        dispatch(logoutTC())
    }
    return (
        <div className="App">
            <Layout style={{height:'100vh'}}>
                <Header>
                <Row justify={'space-between'}>
                        <Col>
                        <Avatar style={{ backgroundColor: '#f56a00' }}>Todo</Avatar>
                        </Col>  
                        <Col>
                            {isLoggedIn && <Button onClick={logOut}>LogOut</Button> }    
                        </Col>
                    </Row>   
                    {status === 'loading' && <LinearProgress color='secondary' />}
                </Header>
            <Content style={{ padding: '0 50px' }}>
             <ErrorSnackbar/> 
            <Routes>
                  <Route path='/' element={<Todolist/>}/>
                  <Route path='login' element={<Login/>}/>
            </Routes>
            </Content>
            </Layout> 
          
        </div>
    );
}

