import React, {useState} from 'react'
import "./ExpenseItem.css";
import ExpenseDate from './ExpenseDate';
import ExpenseDetails from './ExpenseDetails';
const ExpenseItem = (props) => {
           const  {title, date , price,  locOfExpense} =props.expTrack;
           const [upprice,setPrice] = useState(price);
           const deleteExpense = ()=>{
            setPrice("100")
            console.log("expense deleted");
          }
           return (
    <div className='expense-item'>
      <ExpenseDate date={date} />
       <ExpenseDetails title={title} price={upprice} locOfExpense = {locOfExpense} />
       <button onClick={deleteExpense} >expChange</button>
    </div>
  )
  

}


export default ExpenseItem
