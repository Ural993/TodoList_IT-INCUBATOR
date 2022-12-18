import {useEffect} from 'react';
import './App.css';
import Todolist from './components/Todolist';
import { TaskType } from './api/api';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import { CircularProgress, LinearProgress, Typography } from '@material-ui/core';
import ErrorSnackbar from './components/errorSnackbar/ErrorSnackbar';
import { AppRootStateType } from './state/store';
import { initializedAppTC, RequestStatusType } from './state/reducers/app-reducer';
import { Avatar, Button, Col, Layout, Row } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { logoutTC } from './state/reducers/login-reducer';

export type FilterValuesType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export function App() {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state=> state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state=> state.auth.isLoggedIn)
    const login = useSelector<AppRootStateType, string>(state=> state.app.userDate.login)
    
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
                    {isLoggedIn &&<Row align='middle' gutter={10}>
                       <Col>
                       <Typography style={{color:'#f5f5f5'}}>Hi, {login}</Typography>
                       </Col> 
                      <Col>
                       <Button onClick={logOut}>LogOut</Button> 
                      </Col>   
                    </Row>}
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

