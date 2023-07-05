import React from 'react'
import "./ExpenseItem.css"

const ExpenseDetails = (props) => {
  const  {title,price} =props;
    return (
      <div className='expense-item__description'>
      <h2 style={{color: 'yellow'}} >{title} </h2>
      <div className="expense-item__price">${price}</div>
      <button onClick={props.deleteExpense} >Delete</button>
      
    </div>
    )
  
}

export default ExpenseDetails;

