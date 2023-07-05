import React, { useState ,useEffect} from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewExpense from './NewExpense/NewExpense';
import Expenses from './Expenses/Expenses';

const Welcom = () => {
const [isVerified ,setIsVerified] = useState(false);
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

// useEffect(()=>{
//   // fetch expenses from local storage;
//   let fetchExpense=[];
//   console.log("length====",localStorage.length)
//   for (let key of Object.keys(localStorage)) {
//     console.log(key); // Output each key in the localStorage
//     console.log("times");
//     let item = JSON.parse( localStorage.getItem(key));
//     fetchExpense.push(item);
//   }


//   console.log("fetchExpense===",fetchExpense)
//   setExpense(fetchExpense);    
// },[]);


const categories=["Electronic","Food", "SkinCare"]; 


const sendEmailVerification = async (idToken, apiKey) => {
   console.log("request started" ,idToken, apiKey);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
  
    const payload = {
      requestType: 'VERIFY_EMAIL',
      idToken: idToken
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email verification');
      }
          setIsVerified(true);
      console.log('Email verification sent successfully');
    } catch (error) {
      console.log('Error sending email verification:', error);
    }
  };
   const makeEmailRequest = () =>{
      const token = localStorage.getItem('token');
      const api ='AIzaSyA4Old42pkOxqkr1jsyq_dYLAFonOwLHJ4';
        sendEmailVerification(token,api);
   }
  
  return (
    <div style={{marginTop: '7%'}} >
    <div style={{color: 'black' , display: 'flex' , justifyContent:'space-between'}}>
    <div> welcome to expense tracker</div> 
      <div>profile is incomplete.<Link to='/profile' >Complete Now</Link> </div>
    </div>
    <Button   style={{ backgroundColor: isVerified? 'green': 'red', }} onClick={makeEmailRequest}> { isVerified? 'verified': 'Verify Email'}  </Button>
    
    <NewExpense setExpense={newExpenseHandler} />
      <Expenses item = {expense} cat={categories[0]} deleteExp={deleteExpenseeHandler}   />
      <Expenses item = {expense} cat={categories[1]} deleteExp={deleteExpenseeHandler}  />
      <Expenses item = {expense} cat={categories[2]} deleteExp={deleteExpenseeHandler}  />
   
       </div>
  )
}

export default Welcom;
