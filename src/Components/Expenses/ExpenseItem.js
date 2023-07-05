import React, {useContext, useState} from 'react'
import "./ExpenseItem.css";
import Card from '../UI/Card';
import ExpenseDetails from './ExpenseDetails';
import EditContext from '../../store/edit-context';

const ExpenseItem = (props) => {
  const editCtx = useContext(EditContext);
           const  {product,  price,  category,id} =props.expTrack;
           
           const deleteExpense = ()=>{
              props.deleteExp(id);
          }
          const editExpense = ()=>{
            editCtx.onEdit(props.expTrack);
            //props.editExp(id,props.expTrack);
        }

           return (
    <Card className='expense-item'>
      {/* <ExpenseDate date={date} /> */}
    
       <ExpenseDetails title={product} price={price} deleteExpense={deleteExpense} editExp={editExpense} id={id} />
           
    </Card>
  )
  

}


export default ExpenseItem
