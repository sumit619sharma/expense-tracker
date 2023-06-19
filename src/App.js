
import './App.css';

import NewExpense from './Components/NewExpense/NewExpense';
import { useState } from 'react';
import Expenses from './Components/Expenses/Expenses';
          

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
  
  const [expense,setExpense] =useState(expenses);
  return (
    <div className="App">
      <h2>Let's get Started!</h2>
      <NewExpense setExpense={setExpense} prState={expense} />
      <Expenses item = {expense}/>
    </div>
  );
}

export default App;
