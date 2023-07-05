import React, {useState} from 'react'
import "./ExpenseItem.css";
import Card from '../UI/Card';
import ExpenseDetails from './ExpenseDetails';

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
