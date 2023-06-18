import logo from './logo.svg';
import './App.css';
import ExpenseItem from './Components/Expenses/ExpenseItem';
import NewExpense from './Components/NewExpense/NewExpense';
import { useState } from 'react';
import ExpenseFilter from './Components/Expenses/ExpenseFilter';
          

function App() {
  const [filterYear,setfilterYear] = useState();
  const filterChanged= (year)=> {
       setfilterYear(year);
  }

  const [expense,setExpense] =useState([
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
  }
  ]);
  console.log(expense,"after update");
  return (
    <div className="App">
      <h2>Let's get Started!</h2>
      <NewExpense setExpense={setExpense} prState={expense} />
      <ExpenseFilter selected={filterYear} filterChanged={filterChanged} />
      {
        expense.map((obj, ind) => {
          return <ExpenseItem key={ind} expTrack= {obj} /> 
        })
      }
      
    </div>
  );
}

export default App;
