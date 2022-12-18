import React, { useEffect, useState } from 'react'
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AppRootStateType } from '../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorAC } from '../../state/app-reducer';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, string| null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(setErrorAC(null))
    }

    const isOpen = error !== null
    
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error">
      {error}
    </Alert>
  </Snackbar>
  )
}

export default ErrorSnackbar