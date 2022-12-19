import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { authApi, LoginParamsType } from "../../api/api";
import { initializedAppTC, setErrorAC } from "./app-reducer";

type InitialStateType = {
  isLoggedIn: boolean;
};

const initialState: InitialStateType = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const loginReducer = slice.reducer;
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  authApi.login(data).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: true }));
    }
  });
};

export const logoutTC = () => async (dispatch: Dispatch) => {
  const res = await authApi.logout();
  try {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: false }));
    }
  } catch (error: any) {
    dispatch(setErrorAC(error.massage));
  }
};
