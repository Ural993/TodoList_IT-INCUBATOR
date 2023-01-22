import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authApi } from '../../api/api';

import { setIsLoggedInAC } from './login-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
  userDate: UserDateType;
};
type UserDateType = {
  id: number;
  email: string;
  login: string;
};

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
  userDate: {} as UserDateType,
};

export const initializedAppTC = createAsyncThunk(
  'app/initializedAppTC',
  async (_, thunkApI) => {
    const res = await authApi.me();

    try {
      if (res.data.resultCode === 0) {
        thunkApI.dispatch(slice.actions.setUserDate(res.data.data));
        thunkApI.dispatch(setIsLoggedInAC({ value: true }));
      }
    } finally {
      thunkApI.dispatch(slice.actions.setAppInitializedAC(true));
    }
  },
);

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStatusAC(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload;
    },
    setErrorAC(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setAppInitializedAC(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload;
    },
    setUserDate(state, action) {
      state.userDate = action.payload;
    },
  },
});

// export const initializedAppTC = () => async (dispatch: Dispatch) => {
//   const res = await authApi.me();

//   try {
//     if (res.data.resultCode === 0) {
//       dispatch(slice.actions.setUserDate(res.data.data));
//       dispatch(setIsLoggedInAC({ value: true }));
//     }
//   } finally {
//     dispatch(slice.actions.setAppInitializedAC(true));
//   }
// };

export const appReducer = slice.reducer;
export const { setErrorAC, setStatusAC, setAppInitializedAC } = slice.actions;
