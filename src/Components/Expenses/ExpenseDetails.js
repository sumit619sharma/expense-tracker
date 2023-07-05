import React from 'react'
import "./ExpenseItem.css"
import { Button } from 'react-bootstrap';

const ExpenseDetails = (props) => {
  const  {title,price} =props;
    return (
      <div className='expense-item__description'>
      <h2 style={{color: 'yellow'}} >{title} </h2>
      <div className="expense-item__price">${price}</div>
      <Button  variant='info' onClick={props.editExp} >Edit</Button>
      <Button  variant='danger' onClick={props.deleteExpense} >Delete</Button>
     
      
    </div>
    )
  
}

export default ExpenseDetails;

