import React from 'react'

const ExpenseItem = () => {
  let items = ["Food Rs 10","Petrol Rs 100","Movies Rs 200"]
    return (
    <div>
      <h2>Expense Item</h2>
      {
         items.map((el)=>{
            return (
                <h4>{el}</h4>
            )
         })
      }
    </div>
  )
}

export default ExpenseItem
