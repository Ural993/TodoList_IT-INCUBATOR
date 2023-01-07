import { ReactElement, useEffect } from 'react';

import './App.css';
import { CircularProgress, LinearProgress, Typography } from '@material-ui/core';
import { Avatar, Button, Col, Layout, Row } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { TaskType } from './api/api';
import ErrorSnackbar from './components/errorSnackbar/ErrorSnackbar';
import Login from './components/login/Login';
import Todolist from './components/Todolist';
import { initializedAppTC, RequestStatusType } from './state/reducers/app-reducer';
import { logoutTC } from './state/reducers/login-reducer';
import { AppRootStateType } from './state/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export const App = (): ReactElement => {
  const dispatch = useDispatch();
  const status = useSelector<AppRootStateType, RequestStatusType>(
    state => state.app.status,
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    state => state.app.isInitialized,
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );
  const login = useSelector<AppRootStateType, string>(state => state.app.userDate.login);

  useEffect(() => {
    dispatch(initializedAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          width: '100%',
          position: 'fixed',
          top: '50%',
          textAlign: 'center',
        }}
      >
        <CircularProgress />{' '}
      </div>
    );
  }

  const logOut = (): void => {
    dispatch(logoutTC());
  };

  return (
    <div className="App">
      <Layout style={{ height: '100vh' }}>
        <Header>
          <Row justify="space-between">
            <Col>
              <Avatar style={{ backgroundColor: '#f56a00' }}>Todo</Avatar>
            </Col>
            {isLoggedIn && (
              <Row align="middle" gutter={10}>
                <Col>
                  <Typography style={{ color: '#f5f5f5' }}>Hi, {login}</Typography>
                </Col>
                <Col>
                  <Button onClick={logOut}>LogOut</Button>
                </Col>
              </Row>
            )}
          </Row>
          {status === 'loading' && <LinearProgress color="secondary" />}
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <ErrorSnackbar />
          <Routes>
            <Route path="/" element={<Todolist />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Content>
      </Layout>
    </div>
  );
};
