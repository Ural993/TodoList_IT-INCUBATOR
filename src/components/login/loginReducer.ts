import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { authApi, LoginParamsType } from "../../api/api";

type InitialStateType ={
    isLoggedIn: boolean
}


const initialState:InitialStateType ={
    isLoggedIn: false
} 

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{ 
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value}
        }
    }
)


 export const loginReducer = slice.reducer
 const setIsLoggedInAC = slice.actions.setIsLoggedInAC


// thunks
export const loginTC = (data: LoginParamsType)=>(dispatch: Dispatch)=>{
    authApi.login(data)
    .then((res)=>{
        if(res.data.resultCode === 0){
            dispatch(setIsLoggedInAC({value:true}))
        }
    })

}

