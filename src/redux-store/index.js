import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import expenseReducer from "./expense-reducer";


const store = configureStore({
    reducer: { 
        auth: authReducer,
        expense: expenseReducer
    }
})

export default store;