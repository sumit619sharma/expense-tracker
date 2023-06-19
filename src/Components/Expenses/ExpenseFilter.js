import React from 'react'
import "./ExpenseFilter.css"
const ExpenseFilter = (props) => {
    const onChangeFilter= (e)=>{
       props.filterChanged(e.target.value);
    }
  return (
    <div className='expenses-filter'>
        <div className='expenses-filter__control'>
            <label className='label'>Filter by Year</label>
            <select className='select' value={props.selected} onChange={onChangeFilter}>
                <option value="2023"  >2023</option >
                <option value="2022" >2022</option >
                <option value="2021">2021</option >
                <option value="2020">2020</option>
            </select>
        </div>
    </div>
  )
}

export default ExpenseFilter