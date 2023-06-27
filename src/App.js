
import './App.css';

import NewExpense from './Components/NewExpense/NewExpense';
import { useEffect, useState } from 'react';
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
  
  const [expense,setExpense] =useState([]);
  const newExpenseHandler= (newItem)=>{
      
    setExpense( 
      [
       ...expense,newItem,
              ])
              localStorage.setItem(newItem.id, JSON.stringify(newItem) );
  }
  const deleteExpenseeHandler= (deleteId)=>{
 
  let updatedExpense =      expense.filter((el)=>{
    return el.id!=deleteId;
  })
  setExpense(updatedExpense);
  localStorage.removeItem(deleteId);
}
useEffect(()=>{
  // fetch expenses from local storage;
  let fetchExpense=[];
  console.log("length====",localStorage.length)
  for (let key of Object.keys(localStorage)) {
    console.log(key); // Output each key in the localStorage
    console.log("times");
    let item = JSON.parse( localStorage.getItem(key));
    fetchExpense.push(item);
  }
  
  
  console.log("fetchExpense===",fetchExpense)
  setExpense(fetchExpense);
},[]);


const categories=["Electronic","Food", "SkinCare"];

  return (
    <div className="App">
      <h2>Let's get Started!</h2>
      <NewExpense setExpense={newExpenseHandler} />
      <Expenses item = {expense} cat={categories[0]} deleteExp={deleteExpenseeHandler}   />
      <Expenses item = {expense} cat={categories[1]} deleteExp={deleteExpenseeHandler}  />
      <Expenses item = {expense} cat={categories[2]} deleteExp={deleteExpenseeHandler}  />
    </div>
  );
}

export default App;
