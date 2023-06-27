import React from 'react'
import ExpenseForm from './ExpenseForm'
import "./NewExpense.css"

const NewExpense = (props) => {
  return (
    <div className='new-expense'>
        <ExpenseForm setExpense = {props.setExpense} deleteExp={props.deleteExp} />
    </div>
  )
}

export default NewExpense