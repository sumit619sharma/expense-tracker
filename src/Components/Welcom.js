import React, { useState ,useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewExpense from './NewExpense/NewExpense';
import Expenses from './Expenses/Expenses';
import EditContext from '../store/edit-context';
import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../redux-store/expense-reducer';

const Welcom = () => {


const [isVerified ,setIsVerified] = useState(false);
const [expense,setExpense] =useState([]);
 const dispatch = useDispatch();
 const editCtx = useContext(EditContext);
   const authState = useSelector(state=>state.expense);
   console.log("addExpense==",authState);
   console.log("deleteExpense==",authState);
   console.log("updateExpense==",authState);
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
 const passItem = {...newItem,id};
    console.log('passItem',newItem);
  setExpense( 
    [
     ...expense, passItem ,
            ])
  dispatch(expenseAction.addExpense(passItem))

          getAllExpense();
}


const deleteExpenseeHandler= async (deleteId)=>{
 dispatch(expenseAction.removeExpense({id: deleteId}));
   await deleteExpense(deleteId);

   await getAllExpense();

}

const editExpenseeHandler= async (item,id)=>{
  dispatch(expenseAction.updateExpense({item,id}));
   await editExpense(item,id);
   getAllExpense();
  // await deleteExpense(deleteId);
  // await getAllExpense();

}


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
