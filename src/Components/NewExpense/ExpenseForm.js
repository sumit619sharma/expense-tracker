import React, { useContext, useEffect, useState } from 'react'
import "./ExpenseForm.css"
import EditContext from '../../store/edit-context';


const ExpenseForm = (props) => {
  const [enteredID, setID] = useState('');
    const [enteredtitle, setTitle] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredCategory, setCategory] = useState('Electronic');
    const [newExpense,setNewExpense] = useState(true);
      const editCtx = useContext(EditContext);
    
     
const filledEditDetails=()=>{
      setTitle(editCtx.item.product)
      setAmount(editCtx.item.price)
      setCategory(editCtx.item.category)
}

     useEffect(()=>{
        if(editCtx.isEdit){
          filledEditDetails();
        }
        editCtx.offEdit();
     },[editCtx.isEdit])

    const createExpense =async (item)=>{
      console.log(item);
      try {
        const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/expenses.json`,{
          method:'POST',
          body: JSON.stringify(item),
          headers:{
            'Content-Type': 'application/json'
          }
         })
         if(!resp.ok){
          throw new Error("succesful request but no response ")
         }
         const resArr = resp.json();
       return resArr;
        
      } catch (error) {
        console.log("post error==",error);   
      }
     } 

      

     const getExpense =async (id)=>{
         console.log('respId===', id);
         
      try {
        const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${id}.json`)
    
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
            
         
          const resp = await  createExpense(formDetail);
         if(resp.name){
            const resObject = await getExpense(resp.name);
            props.setExpense(resObject,resp.name);
         }
           
       
          
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
    
    <button  type='submit' >Add-Product</button>
    
    </div>
       </form>
      {/* ) } */}

         </>
  )
}

export default ExpenseForm