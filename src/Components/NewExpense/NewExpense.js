import React from 'react'
import ExpenseForm from './ExpenseForm'
import "./NewExpense.css"

const NewExpense = (props) => {
  return (
    <div className='new-expense'>
        <ExpenseForm setExpense = {props.setExpense} prState ={props.prState} />
    </div>
  )
}

export default NewExpense