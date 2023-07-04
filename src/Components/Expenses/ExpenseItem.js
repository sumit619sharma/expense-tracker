import React, {useState} from 'react'
import "./ExpenseItem.css";
import ExpenseDate from './ExpenseDate';
import ExpenseDetails from './ExpenseDetails';
import Card from '../UI/Card';
const ExpenseItem = (props) => {
           const  {product,  price,  category,id} =props.expTrack;
           
           const deleteExpense = ()=>{
              props.deleteExp(id);
          }
           return (
    <Card className='expense-item'>
      {/* <ExpenseDate date={date} /> */}
       <ExpenseDetails title={product} price={price} id = {id} />
        <div className="expense-item__price">   
       <button onClick={deleteExpense} >Delete</button>
       </div>   
    </Card>
  )
  

}


export default ExpenseItem
