import React from 'react'
import "./ExpenseItem.css"

const ExpenseDetails = (props) => {
    const  {title,price,  locOfExpense} =props;
  return (
    <div className='expense-item__description'>
    <h2>{title} </h2>
    <div className="expense-item__price"> {locOfExpense}</div>
    <div className="expense-item__price">${price}</div>
  </div>
  )
}

export default ExpenseDetails
