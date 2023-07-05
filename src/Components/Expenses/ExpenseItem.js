import React, {useState} from 'react'
import "./ExpenseItem.css";
import Card from '../UI/Card';
import ExpenseDetails from './ExpenseDetails';

const ExpenseItem = (props) => {
           const  {product,  price,  category} =props.expTrack;
           
           const deleteExpense = ()=>{
              props.deleteExp();
          }
           return (
    <Card className='expense-item'>
      {/* <ExpenseDate date={date} /> */}
    
       <ExpenseDetails title={product} price={price} deleteExpense={deleteExpense} />
           
    </Card>
  )
  

}


export default ExpenseItem
