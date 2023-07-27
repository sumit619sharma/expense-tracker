
import './App.css';



import { Provider } from 'react-redux';
import {store,persistor} from './redux-store/index';
import Root from './root';
import { PersistGate } from 'redux-persist/integration/react';

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
       <PersistGate loading={null} persistor={persistor}>
    <Root/>
    </PersistGate>
      </Provider>
    
  );
}

export default App;
