import { createSlice } from "@reduxjs/toolkit";

const initialState={
    expenseItem: [],
    expenseTotal: 0,
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
     addExpense(state,action){
        state.expenseItem.push(action.payload);

     },removeExpense(state,action){
        console.log("removeExpense==", action.payload.id);
           state.expenseItem = state.expenseItem.filter((item)=>{
            console.log("reducerItem==",item);
          return  item.id!=action.payload.id });
     },updateExpense(state,action){
        var idx =-1;
        state.expenseItem.forEach((ele,ind)=>{
            if(ele.id==action.payload.id){
                idx=ind;
                return;
            }
        })
        const passItem = {...action.payload.item,id: action.payload.id}
        state.expenseItem[idx]=passItem;
     }
    }
})

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;