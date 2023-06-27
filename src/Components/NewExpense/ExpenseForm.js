import React, { useState } from 'react'
import "./ExpenseForm.css"


const ExpenseForm = (props) => {
  const [enteredID, setID] = useState('');
    const [enteredtitle, setTitle] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredCategory, setCategory] = useState('Electronic');
    const [newExpense,setNewExpense] = useState(true);
      
     
 //    console.log(props," in expenseForm ====")
    const addExpense = (event) => {
      event.preventDefault();
      setNewExpense(!newExpense);
     
          let formDetail = {
            category: enteredCategory,
            id: enteredID,
            price: enteredAmount,
            product: enteredtitle,}
    
            // setExpense( 
            //    [
            //     ...prState,formDetail,
            //            ])
                 
            props.setExpense(formDetail);
  setAmount(''); setCategory('Electronic'); setTitle('');  setID('');};
           
  const showAddExpense = ()=>{
    setNewExpense(!newExpense);
  }
    return (
      <>
      { newExpense ? (
              <div className='new-expense__show'>
              
            <button  onClick={showAddExpense} >Add-New-Expense</button>
            
            </div>
      ) : (
        
      <form onSubmit={addExpense} >
      <div className='new-expense__controls'>            
      <div className='new-expense__control'>
      <label>ID</label>
      <input  type='text' value={enteredID} onChange={(e) => {setID(e.target.value)}}  />
      </div>
      <div className='new-expense__control'>
      <label>Product Name</label>
      <input  type='text' value={enteredtitle} onChange={(e) => {setTitle(e.target.value)}}  />
      </div>
      <div className='new-expense__control'>
      <label>Selling Price</label>
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
      <button  onClick={showAddExpense} >Cancel</button>
    <button  type='submit' >Add-Expense</button>
    
    </div>
       </form>
      ) }

         </>
  )
}

export default ExpenseForm