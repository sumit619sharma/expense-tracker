import React,{useState} from 'react'
import "./Expenses.css"
import ExpenseItem from './ExpenseItem';
import ExpenseFilter from './ExpenseFilter';
import Card from '../UI/Card';
import ExpensesChart from './ExpensesChart';
const Expenses = (props) => {
    const [filterYear,setfilterYear] = useState("2023");
    
   let expense = props.item;
    const filterChanged= (year)=> {
      setfilterYear(year);
     }
  
  let filterList = expense.filter((el)=>{
      return el.date.getFullYear().toString()==filterYear;
  })
  

  return (
    <Card className='expenses'>
         <ExpenseFilter selected={filterYear} filterChanged={filterChanged} />
        <ExpensesChart expenses={filterList} />
       {filterList.length===0 && <h2>"No Expenses in year {filterYear} ..."</h2>}
       
       {filterList.map((obj, ind) => {
              return <ExpenseItem key={ind} expTrack= {obj} /> 
            })}
       {filterList.length===1 && <h2>"Only single Expense here. Please add more..."</h2>}
    </Card>
  )
}

export default Expenses
