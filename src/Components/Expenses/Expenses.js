import React,{useState} from 'react'
import "./Expenses.css"
import ExpenseItem from './ExpenseItem';
import ExpenseFilter from './ExpenseFilter';

import ExpensesChart from './ExpensesChart';
import Card from '../UI/Card';
import Cards from '../UI/Card';
const Expenses = (props) => {
   // const [filterYear,setfilterYear] = useState("2023");
    
   let expense = props.item;
    // const filterChanged= (year)=> {
    //   setfilterYear(year);
    //  }
  
  // let filterList = expense.filter((el)=>{
  //     return el.date.getFullYear().toString()==filterYear;
  // })
  
   let filterList = expense.filter((el)=>{
   
        return el.category==props.cat;
    })
    
  
  return (
    <Cards className='expenses'>
         {/* <ExpenseFilter selected={filterYear} filterChanged={filterChanged} /> */}
       {/* <ExpensesChart expenses={filterList} /> */}
       {/* {filterList.length===0 && <h2>"No Expenses in year {filterYear} ..."</h2>} */}
       <div>
       <div style={{color: "red",fontSize: 20}}>{props.cat}</div>
       </div>
       {filterList.map((obj, ) => {
              return <>
               <ExpenseItem key={obj.id} expTrack= {obj} deleteExp={props.deleteExp} editExp={props.editExp} /> 
              
               </>})}
       {/* {filterList.length===1 && <h2>"Only single Expense here. Please add more..."</h2>} */}
       </Cards>
  )
}

export default Expenses
