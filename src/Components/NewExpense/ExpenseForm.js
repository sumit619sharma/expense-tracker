import React, { useState } from 'react'
import "./ExpenseForm.css"


const ExpenseForm = (props) => {
    const [enteredtitle, setTitle] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredDate, setDate] = useState('');
     let setExpense = props.setExpense;
     let prState = props.prState;
     console.log(props," in expenseForm ====")
    const addExpense = () => {
          let formDetail = {
            date: new Date(2023,6,16),
            title: enteredtitle,
            amount: enteredAmount,
            locOfExpense: "mernStack",}
    
            setExpense(
               [
                formDetail,...prState,
                          
              ]
             )

            };
           
    return (
      <form>
        <div className='new-expense__controls'>            
        <div className='new-expense__control'>
        <label>Title</label>
        <input  type='text' value={enteredtitle} onChange={(e) => {setTitle(e.target.value)}}  />
        </div>
        <div className='new-expense__control'>
        <label>Number</label>
        <input  type='number' value={enteredAmount} onChange={(e) => {setAmount(e.target.value)}}   />
        </div>
        <div className='new-expense__control'>
        <label>Date</label>
        <input type='date' value={enteredDate} onChange={(e) => {setDate(e.target.value)}}    />
        </div>
        </div>
        <div className='new-expense__actions'>
      <button  type='submit'  onClick={addExpense}>Add-Expense</button>
      </div>
         </form>
   
  )
}

export default ExpenseForm