import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userDetail: {},
    
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      onLogIn(state,action) {
        
        state.isLoggedIn= true;
        state.userDetail =  {... action.payload.data}    },
      onLogOut(state){
         state.isLoggedIn=false;
         state.userDetail={};
      }
    }
})

export const authAction = authSlice.actions;

export default authSlice.reducer;