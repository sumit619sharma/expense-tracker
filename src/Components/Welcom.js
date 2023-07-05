import React, { useState ,useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewExpense from './NewExpense/NewExpense';
import Expenses from './Expenses/Expenses';
import EditContext from '../store/edit-context';

const Welcom = () => {

  console.log('ckeck if welcome screen render');
const [isVerified ,setIsVerified] = useState(false);
const [expense,setExpense] =useState([]);
console.log("total expense==",expense);
 const editCtx = useContext(EditContext);
const editExpense =async (item,id)=>{
  // maybe i can remove id from item 
  
  try {
    const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${id}.json`,{
      method:'PUT',
      body: JSON.stringify(item),
      headers:{
        'Content-Type': 'application/json'
      }
     })
     if(!resp.ok){
      throw new Error("succesful request but no response ")
     }
     const resArr =await resp.json();
     console.log("edit Result===",resArr);
 editCtx.offSureEdit();
 getAllExpense();
    
  } catch (error) {
    console.log("post error==",error);   
  }
 }


const deleteExpense =async (id)=>{
  
  
  try {
   const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${id}.json`,{
    method:'DELETE',
     })
  
   if(!resp.ok){
     throw new Error("succesful request but no response ")
    }
    const resObj = await resp.json();
    console.log('Successfully Deleted Expense==', resObj); 
  
      
  
   
  } catch (error) {
   console.log("post error==",error);   
  }
  } 

const getAllExpense =async ()=>{
  
  
try {
 const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/expenses.json`)

 if(!resp.ok){
   throw new Error("succesful request but no response ")
  }
  const resObj = await resp.json();
  console.log('All Expense==', resObj); 

    onRefreshGetExpense(resObj);

 
} catch (error) {
 console.log("post error==",error);   
}
} 

const onRefreshGetExpense = (resObj)=>{
 const expenseArr = [];
  for(let key in resObj){
    const currExpDetail = resObj[key];
    expenseArr.push( {... currExpDetail,id:key} );
  }

  setExpense(expenseArr);  
}

const newExpenseHandler= (newItem,id)=>{
  console.log('newItem id==',id);
    
  setExpense( 
    [
     ...expense, {...newItem,id:id} ,
            ])
          getAllExpense();
}


const deleteExpenseeHandler= async (deleteId)=>{
 
   await deleteExpense(deleteId);
   await getAllExpense();

}

const editExpenseeHandler= async (item,id)=>{
   await editExpense(item,id);
   getAllExpense();
  // await deleteExpense(deleteId);
  // await getAllExpense();

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

useEffect(()=>{
   getAllExpense();
},[]);


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
    
    <NewExpense setExpense={newExpenseHandler} editExp ={editExpenseeHandler}  />
      <Expenses item = {expense} cat={categories[0]} deleteExp={deleteExpenseeHandler}  />
      <Expenses item = {expense} cat={categories[1]} deleteExp={deleteExpenseeHandler}   />
      <Expenses item = {expense} cat={categories[2]} deleteExp={deleteExpenseeHandler}  />
   
       </div>
  )
}

export default Welcom;
