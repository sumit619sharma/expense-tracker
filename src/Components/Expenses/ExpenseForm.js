import React, { useState } from 'react'

const ExpenseForm = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
  
    const addExpense = () => {
      
      console.log('Title:', title);
      console.log('Amount:', amount);
      console.log('Date:', date);
    };

    return (
    <div>
       <div>
        <input  type='text' value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder='title' />
        <input  type='number' value={amount} onChange={(e) => {setAmount(e.target.value)}}  placeholder='amount' />
        <input type='date' value={date} onChange={(e) => {setDate(e.target.value)}}  placeholder='date'  />
        </div>
      <button onClick={addExpense}>Add-Expense</button>
    </div>
  )
}

export default ExpenseForm