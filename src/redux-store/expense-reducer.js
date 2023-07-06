import { createSlice } from "@reduxjs/toolkit";

const initialState={
    expenseItem: {},
    expenseTotal: 0,
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
     addExpense(state,action){
   // var upstate = state
        state.expenseItem[action.payload.id]=action.payload;
        state.expenseTotal =Number( state.expenseTotal)+Number(action.payload.price)
 
     },removeExpense(state,action){
        if(Object.keys(state.expenseItem).length==0) return state;
        console.log("removeExpense==", action.payload.id);
        state.expenseTotal = Number(state.expenseTotal)-  Number(state.expenseItem[action.payload.id].price)     
        delete state.expenseItem[action.payload.id];
     },updateExpense(state,action){
        state.expenseTotal = Number(state.expenseTotal)-  Number(state.expenseItem[action.payload.id].price);
        state.expenseTotal = Number(state.expenseTotal)+  Number(action.payload.item.price);
        
      const passItem= {...action.payload.item,id: action.payload.id}
        state.expenseItem[ action.payload.id]=passItem;
     }
    }
})

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;