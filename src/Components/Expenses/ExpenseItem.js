import React, {useContext, useState} from 'react'
import "./ExpenseItem.css";
import Card from '../UI/Card';
import ExpenseDetails from './ExpenseDetails';
import EditContext from '../../store/edit-context';
import Cards from '../UI/Card';

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

           return (  <Cards   className='expense-item'>
        <ExpenseDetails title={product} price={price} deleteExpense={deleteExpense} editExp={editExpense} id={id} />
        </Cards>
    
  )
  

}


export default ExpenseItem
