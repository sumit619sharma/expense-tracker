import React from 'react'
import "./ExpenseItem.css";
const ExpenseItem = (props) => {
    console.log(" props===",  props)
            const  {title, date , price,  locOfExpense} =props.expTrack;
    return (
    <div className='expense-item'>
      <div>{date.getTime().toString() }</div>
      <div className='expense-item__description'>
        <h2>{title} </h2>
        <div className="expense-item__price"> {locOfExpense}</div>
        <div className="expense-item__price">${price}</div>
      </div>
    </div>
  )
}

export default ExpenseItem
