import React, {useState} from 'react'
import "./ExpenseItem.css";
import ExpenseDate from './ExpenseDate';
import ExpenseDetails from './ExpenseDetails';
import Card from '../UI/Card';
const ExpenseItem = (props) => {
           const  {title, date , price,  locOfExpense} =props.expTrack;
           const [upprice,setPrice] = useState(price);
           const deleteExpense = ()=>{
            setPrice("100")
            console.log("expense deleted");
          }
           return (
    <Card className='expense-item'>
      <ExpenseDate date={date} />
       <ExpenseDetails title={title} price={upprice} locOfExpense = {locOfExpense} />
       <button onClick={deleteExpense} >expChange</button>
    </Card>
  )
  

}


export default ExpenseItem
