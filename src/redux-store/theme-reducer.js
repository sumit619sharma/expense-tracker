import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
    }

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      toggleTheme(state){
        state.theme= state.theme=='light'? 'dark' : 'light'
      },
      darkTheme(state){
        state.theme= 'dark';
      }
    }
})

export const themeAction = themeSlice.actions;

export default themeSlice.reducer;