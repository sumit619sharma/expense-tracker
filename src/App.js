
import './App.css';



import { Provider } from 'react-redux';
import store from './redux-store';
import Root from './root';

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
const  App = ()=> {
  
  








  return (
    
    <Provider store={store} >
    <Root/>
      </Provider>
    
  );
}

export default App;
