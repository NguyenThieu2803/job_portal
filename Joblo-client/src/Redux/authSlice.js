import { createSlice } from '@reduxjs/toolkit'


const authSlice =  createSlice({
    name:'auth',
    initialState:{
        login:{
            currentUser:null,
            isLoggedIn:false,
            error:false
        }
    },
    reducers:{
        loginStart: (state) => {
            state.login.isLoggedIn = true;
        },
        loginSuccess: (state, action) => {
            state.login.isLoggedIn=false;
            state.login.currentUser=action.payload;
            state.login.error=false;
        },
        loginFailed:(state)=>{
            state.login.isLoggedIn=false;
            state.login.error=true;
        }

    }
});


export const {
    loginStart,
    loginSuccess,
    loginFailed
} = authSlice.actions;


export default authSlice.reducer