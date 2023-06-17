import React from 'react'
import "./ExpenseItem.css";
import ExpenseDate from './ExpenseDate';
import ExpenseDetails from './ExpenseDetails';
const ExpenseItem = (props) => {
   // console.log(" props===",  props)
            const  {title, date , price,  locOfExpense} =props.expTrack;
          
    return (
    <div className='expense-item'>
      <ExpenseDate date={date} />
       <ExpenseDetails title={title} price={price} locOfExpense = {locOfExpense} />
       <button onClick={deleteExpense} >Delete</button>
    </div>
  )
}
const deleteExpense = ()=>{
  console.log("expense deleted");
}

export default ExpenseItem
