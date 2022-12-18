import { Grid, Paper } from '@material-ui/core';
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm } from '../AddItemForm';
import { TaskStatuses } from '../api/api';
import { FilterValuesType, TasksStateType } from '../App';
import { AppRootStateType } from '../state/store';
import { addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC } from '../state/tasksReducer';
import { addTodolistTC, ChangeTodolistFilterAC, changeTodolistTitleTC, removeTodolistTC, TodolistDomainType } from '../state/todolistsReducer';
import { TodolistItem } from '../TodolistItem';

function Todolist() {
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
    <>        
        <Grid container>
    <Grid style={{padding: '10px'}}>
        <AddItemForm addItem={Todolist}/>
    </Grid>
    <Grid container spacing={3}>

        {
            todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id];
                return <Grid item key={tl.id}>
                    <Paper elevation={3} style={{padding: '10px'}}>
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
            })
        }
    </Grid>
</Grid>
</>
  )
}

export default Todolist