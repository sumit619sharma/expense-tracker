import logo from './logo.svg';
import './App.css';
import ExpenseItem from './Components/Expenses/ExpenseItem';

function App() {
  const expense = [
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
  ]
  return (
    <div className="App">
      <h2>Let's get Started!</h2>
      {
        expense.map((obj, ind) => {
          return <ExpenseItem key={ind} expTrack= {obj} /> 
        })
      }
      
    </div>
  );
}

export default App;
