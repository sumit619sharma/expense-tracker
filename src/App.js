import logo from './logo.svg';
import './App.css';
import ExpenseItem from './Components/Expenses/ExpenseItem';
import NewExpense from './Components/NewExpense/NewExpense';
import { useState } from 'react';
import ExpenseFilter from './Components/Expenses/ExpenseFilter';
          

const expenses = [
  {
     date : new Date(2023,6,16),
  title : "Car Insurance",
  price : "299",
  locOfExpense : "mernStack",
  },{
    date : new Date(2023,6,16),
 title : "Car Insurance",
 price : "299",
 locOfExpense : "mernStack",
 },{
  date : new Date(2023,6,16),
title : "Car Insurance",
price : "299",
locOfExpense : "mernStack",
},
]
function App() {
  
  const [filterYear,setfilterYear] = useState("none");
  const [expense,setExpense] =useState(expenses);
 const [filterList,setFilterList] = useState(expenses);
  const filterChanged= (year)=> {
    
   let list =  expense.filter((ele)=>{
    console.log("year====",ele.date.getFullYear()," filter ",year)
      return ele.date.getFullYear()==year;
        })
        console.log("filteredList===",list);
   setFilterList(list);
    setfilterYear(year);
  }
  console.log("year===",filterYear)
  console.log(expense,"after update");
 console.log(filterList,"after update filter");
  return (
    <div className="App">
      <h2>Let's get Started!</h2>
      <NewExpense setExpense={setExpense} prState={expense} />
      <ExpenseFilter selected={filterYear} filterChanged={filterChanged} />
       {
        filterYear=="none" ? (
        console.log("yes======="),
              expense.map((obj, ind) => {
              return <ExpenseItem key={ind} expTrack= {obj} /> 
            })
       ) : (
        filterList.map((obj, ind) => {
          return <ExpenseItem key={ind} expTrack= {obj} /> 
        })
       )                    

      }
      
    </div>
  );
}

export default App;
