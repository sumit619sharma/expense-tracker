import React, { useContext, useEffect, useState } from 'react'
import "./ExpenseForm.css"
import EditContext from '../../store/edit-context';
import { useSelector } from 'react-redux';


const ExpenseForm = (props) => {
  const [enteredID, setID] = useState('');
    const [enteredtitle, setTitle] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredCategory, setCategory] = useState('Electronic');
    const [newExpense,setNewExpense] = useState(true);
      const editCtx = useContext(EditContext);
    const user = useSelector(state=> state.auth.userDetail);
    const modifiedEmail = user.email.replace(/[@.]/g, '');
     
const filledEditDetails=()=>{
      setTitle(editCtx.item.product)
      setAmount(editCtx.item.price)
      setCategory(editCtx.item.category)
}

     useEffect(()=>{
        if(editCtx.sureEdit){
          filledEditDetails();
        }
        //editCtx.offEdit();
     },[editCtx.sureEdit])

    const createExpense =async (item)=>{
      
      try {
   // `https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`
        const resp=  await fetch('http://localhost:3000/expense',{
          method:'POST',
          body: JSON.stringify(item),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': user.idToken
          }
         })

         if(!resp.ok){
          throw new Error("succesful request but no response ")
         }
      
      
        
      } catch (error) {
        console.log("post error==",error);   
      }
     } 

      const getExpense =async (id)=>{
         console.log('respId===', id);
         
      try {
       // `https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${id}.json`     
        const resp=  await fetch(`http://localhost:3000/expense/get-one/${id}`)
    
        if(!resp.ok){
          throw new Error("succesful request but no response ")
         }
         const resObj = await resp.json();
        
       return resObj;
        
      } catch (error) {
        console.log("post error==",error);   
      }
     } 

    const addExpense =async (event) => {
      event.preventDefault();

           let formDetail = {
            category: enteredCategory,
            price: enteredAmount,
            product: enteredtitle,}
    
       if(editCtx.sureEdit){
        //api call
        props.editExp(formDetail,editCtx.item.id);
    setAmount(''); setCategory('Electronic'); setTitle('');    
    return ;
       }          
            
         
          await  createExpense(formDetail);
        //  if(resp.name){
        //     const resObject = await getExpense(resp.name);
        //     props.setExpense(resObject,resp.name);
        //  }
        
           
        // if(resp.id){
        //   const resObject = await getExpense(resp.id);
        //  console.log("get by id==",resObject);
        //  props.setExpense(resObject,resp.id);
       //}
       props.setExpense();
       
          
            setAmount(''); setCategory('Electronic'); setTitle('');  ;};
           
  
            const showAddExpense = ()=>{
    setNewExpense(!newExpense);
  }
    return (
      <>
      {/* { newExpense ? (
              <div className='new-expense__show'>
              
            <button  onClick={showAddExpense} >Add-New-Product</button>
            
            </div>
      ) : ( */}
        
      <form onSubmit={addExpense} >
      <div className='new-expense__controls'>            
      {/* <div className='new-expense__control'>
      <label>ID</label>
      <input  type='text' value={enteredID} onChange={(e) => {setID(e.target.value)}}  />
      </div> */}
      <div className='new-expense__control'>
      <label>Product Name</label>
      <input  type='text' value={enteredtitle} onChange={(e) => {setTitle(e.target.value)}}  />
      </div>
      <div className='new-expense__control'>
      <label>Expense Amount</label>
      <input  type='number' value={enteredAmount} onChange={(e) => {setAmount(e.target.value)}}   />
      </div>
      <div className='new-expense__control'>
      <label>Category</label>
      {/* <input type='date' value={enteredDate} onChange={(e) => {setDate(e.target.value)}}    /> */}
      <select  value={enteredCategory} onChange={(e)=>setCategory(e.target.value)}>
        <option value={"Electronic"} >Electronic</option>
        <option value={"Food"} >Food</option>
        <option value={"SkinCare"}  >SkinCare</option>
        </select>
      </div>
      </div>
      
      <div className='new-expense__actions'>
    
    <button  type='submit' > {editCtx.sureEdit? 'Update':'Add-Product' }</button>
    
    </div>
       </form>
      {/* ) } */}

         </>
  )
}

export default ExpenseForm