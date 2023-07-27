import React, { useState ,useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewExpense from './NewExpense/NewExpense';
import Expenses from './Expenses/Expenses';
import EditContext from '../store/edit-context';
import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../redux-store/expense-reducer';
import { themeAction } from '../redux-store/theme-reducer';

const Welcom = () => {


const [isVerified ,setIsVerified] = useState(false);
const [expense,setExpense] =useState([]);
const [href,setHref] = useState(null);
 const dispatch = useDispatch();
 const editCtx = useContext(EditContext);
   const totalExpense = useSelector(state=>state.expense.expenseTotal);
   const user = useSelector(state=>state.auth.userDetail);
  console.log("WELCOME SCREEN");
    const modifiedEmail = user.email.replace(/[@.]/g, '');
     
const editExpense =async (item,id)=>{
  // maybe i can remove id from item 
  item = {...item,id}
  console.log("edit item==",item);
  try {
    //`https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${id}.json`
    const resp=  await fetch('http://localhost:3000/expense',{
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
   
     
    
  } catch (error) {
    console.log("post error==",error);   
  }
 }


const deleteExpense =async (id)=>{
  
  
  try {
    //`https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${id}.json`
   const resp=  await fetch(`http://localhost:3000/expense/delete/${id}`,{
    method:'DELETE',
     })
  
   if(!resp.ok){
     throw new Error("succesful request but no response ")
    }
    //const resObj = await resp.json();
    console.log('Successfully Deleted Expense==', resp); 
  
      
  
   
  } catch (error) {
   console.log("post error==",error);   
  }
  } 

const getAllExpense =async ()=>{
  
  
try {
  
//`https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`
  const resp=  await fetch('http://localhost:3000/expense')

 if(!resp.ok){
   throw new Error("succesful request but no response ")
  }
  const resArr = await resp.json();
  console.log("resArr===getAllExoense",resArr)
  const resObj= resArr.reduce((result, obj) => {
    result[obj.id] = obj;
    return result;
  }, {});
    onRefreshGetExpense(resObj);
    setExpense(resArr);
 
} catch (error) {
 console.log("post error==",error);   
}
} 

const onRefreshGetExpense = (resObj)=>{
 dispatch((expenseAction.getRefreshExpense(resObj)));
  // const expenseArr = [];
  // for(let key in resObj){
  //   const currExpDetail = resObj[key];
  //   expenseArr.push( {... currExpDetail,id:key} );
  // }

  // setExpense(expenseArr);  
}

const newExpenseHandler= (newItem,id)=>{
//  const passItem = {...newItem,id};
// const passItem = newItem   

  // setExpense( 
  //   [
  //    ...expense, passItem ,
  //           ])
  //  dispatch(expenseAction.addExpense(passItem))

          getAllExpense();
}


const deleteExpenseeHandler= async (deleteId)=>{
 dispatch(expenseAction.removeExpense({id: deleteId}));
   await deleteExpense(deleteId);

   await getAllExpense();

}

const editExpenseeHandler= async (item,id)=>{
  console.log('edit habdler==',item,id);
//  dispatch(expenseAction.updateExpense({item,id}));
   await editExpense(item,id);
   editCtx.offSureEdit();
 await getAllExpense();
 //  getAllExpense();
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
      const token = user.idToken
      const api ='AIzaSyA4Old42pkOxqkr1jsyq_dYLAFonOwLHJ4';
        sendEmailVerification(token,api);
   }
   const onPremiumTheme = ()=>{
  dispatch(themeAction.darkTheme());

   }
   const onToggleTheme = ()=>{
    dispatch(themeAction.toggleTheme());
     }
     const OnDownloadExpense = ()=>{
         const blob = new Blob(expense,{type: 'text/plain'})
         setHref(URL.createObjectURL(blob) );
        }
  
  return (
    <div style={{marginTop: '7%'}} >
    <div style={{color: 'black' , display: 'flex' , justifyContent:'space-between'}}>
    
      <div>profile is incomplete.<Link to='/profile' >Complete Now</Link> </div>
    </div>
    <div style={{display:'flex', justifyContent: 'space-around'}} >
    <Button   style={{ backgroundColor: isVerified? 'green': 'red', }} onClick={makeEmailRequest}> { isVerified? 'verified': 'Verify Email'}  </Button>
     {totalExpense>10000 && <Button   variant='success'  onClick={onPremiumTheme}>Activate-premium</Button>} 
     {totalExpense>10000 && <Button   variant='success'  onClick={OnDownloadExpense}> <a download="expense1.txt" href={href} >DownLoad-Expense</a> </Button>}
     <Button   variant='warning'  onClick={onToggleTheme}>change-theme</Button>
    </div>
    <NewExpense setExpense={newExpenseHandler} editExp ={editExpenseeHandler}  />
      <Expenses item = {expense} cat={categories[0]} deleteExp={deleteExpenseeHandler} editExp ={editExpenseeHandler} />
      <Expenses item = {expense} cat={categories[1]} deleteExp={deleteExpenseeHandler}   editExp ={editExpenseeHandler} />
      <Expenses item = {expense} cat={categories[2]} deleteExp={deleteExpenseeHandler}  editExp ={editExpenseeHandler} />
   
       </div>
  )
}

export default Welcom;
