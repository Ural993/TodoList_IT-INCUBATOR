import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authApi, LoginParamsType } from '../../api/api';

import { setAppInitializedAC, setErrorAC } from './app-reducer';

type InitialStateType = {
  isLoggedIn: boolean;
};

const initialState: InitialStateType = {
  isLoggedIn: false,
};

export const loginTC = createAsyncThunk(
  'auth/loginTC',
  (data: LoginParamsType, thunkAPI) => {
    authApi.login(data).then(res => {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLoggedInAC({ value: true }));
      }
    });
  },
);

export const logoutTC = createAsyncThunk('auth/logoutTC', async (_, thunkAPI) => {
  const res = await authApi.logout();

  try {
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setIsLoggedInAC({ value: false }));
      thunkAPI.dispatch(setAppInitializedAC(true));
    }
  } catch (error: any) {
    thunkAPI.dispatch(setErrorAC(error.massage));
  }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const loginReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

// thunks
// export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
//   authApi.login(data).then(res => {
//     if (res.data.resultCode === 0) {
//       dispatch(setIsLoggedInAC({ value: true }));
//     }
//   });
// };

// export const logoutTC = () => async (dispatch: Dispatch) => {
//   const res = await authApi.logout();

//   try {
//     if (res.data.resultCode === 0) {
//       dispatch(setIsLoggedInAC({ value: false }));
//       dispatch(setAppInitializedAC(true));
//     }
//   } catch (error: any) {
//     dispatch(setErrorAC(error.massage));
//   }
// };
