import { Grid, Paper } from "@mui/material";
import { ReactElement, useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { TaskStatuses } from "../api/api";
import { FilterValuesType, TasksStateType } from "../App";
import {
  addTaskTC,
  changeTaskStatusTC,
  changeTaskTitleTC,
  removeTaskTC,
} from "../state/reducers/tasks-reducer";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  getTodolists,
  removeTodolistTC,
  TodolistDomainType,
} from "../state/reducers/todolists-reducer";
import { AppRootStateType } from "../state/store";

import { AddItemForm } from "./addItemForm/AddItemForm";
import { TodolistItem } from "./TodolistItem";

const Todolist = (): ReactElement => {
  const dispatch = useDispatch();

  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch<any>(addTaskTC(todolistId, title));
  }, []);

  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch<any>(removeTaskTC(todolistId, id));
  }, []);

  const changeStatus = useCallback(
    (id: string, isDone: TaskStatuses, todolistId: string) => {
      dispatch<any>(changeTaskStatusTC(todolistId, id, isDone));
    },
    []
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch<any>(changeTaskTitleTC(todolistId, id, newTitle));
    },
    []
  );

  const addTodolist = useCallback((title: string) => {
    dispatch<any>(addTodolistTC(title));
  }, []);

  const removeTodolist = useCallback((id: string) => {
    dispatch<any>(removeTodolistTC(id));
  }, []);

  const changeFilter = useCallback(
    (filter: FilterValuesType, todolistId: string) => {
      const action = changeTodolistFilterAC({ filter, todolistId });

      dispatch(action);
    },
    []
  );

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch<any>(changeTodolistTitleTC(id, title));
  }, []);

  useEffect(() => {
    dispatch<any>(getTodolists());
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="login" />;
  }

  return (
    <Grid container>
      <Grid style={{ padding: "10px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          const tasksForTodolist = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper elevation={3} style={{ padding: "10px" }}>
                <TodolistItem
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
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Todolist;
