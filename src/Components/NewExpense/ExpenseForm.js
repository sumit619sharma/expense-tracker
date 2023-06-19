import React, { useState } from 'react'
import "./ExpenseForm.css"


const ExpenseForm = (props) => {
    const [enteredtitle, setTitle] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredDate, setDate] = useState('');
    const [newExpense,setNewExpense] = useState(true);
     let setExpense = props.setExpense;
     let prState = props.prState;
 //    console.log(props," in expenseForm ====")
    const addExpense = (event) => {
      event.preventDefault();
      setNewExpense(!newExpense);
          let formDetail = {
            date: new Date(enteredDate),
            title: enteredtitle,
            price: enteredAmount,
            locOfExpense: "mernStack",}
    
            setExpense( 
               [
                ...prState,formDetail,
                       ])
                 
  setAmount(''); setDate(''); setTitle('');};
           
  const showAddExpense = ()=>{
    setNewExpense(!newExpense);
  }
    return (
      <>
      { newExpense ? (
              <div className='new-expense__show'>
              
            <button  onClick={showAddExpense} >Add-New-Expense</button>
            
            </div>
      ) : (
        
      <form onSubmit={addExpense} >
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
      <button  onClick={showAddExpense} >Cancel</button>
    <button  type='submit' >Add-Expense</button>
    
    </div>
       </form>
      ) }

         </>
  )
}

export default ExpenseForm