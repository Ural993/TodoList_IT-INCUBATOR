import React, { ReactElement } from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';

import { setErrorAC } from '../../state/reducers/app-reducer';
import { AppRootStateType } from '../../state/store';

const Alert = (props: AlertProps): ReactElement => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ErrorSnackbar = (): ReactElement => {
  const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorAC(null));
  };

  const isOpen = error !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
