import React from 'react'
import Chart from '../Charts/Chart'

const ExpensesChart = (props) => {
    const chartDataPoints = [
        {label: "Jan" , value: 0},
        {label: "Feb" , value: 0},{label: "Mar" , value: 0},{label: "Apr" , value: 0},{label: "May" , value: 0},
        {label: "Jun" , value: 0},{label: "July" , value: 0},{label: "Aug" , value: 0},{label: "Sep" , value: 0},
        {label: "Oct" , value: 0},{label: "Nov" , value: 0},{label: "Dec" , value: 0},
      ]
     
       for(let expense of props.expenses){
       
        let expenseMonth = expense.date.getMonth();
        
        
        chartDataPoints[expenseMonth].value+= Number(expense.price);
        
       }
  return (
    <div>
      <Chart dataPoints={chartDataPoints}/>
    </div>
  )
}

export default ExpensesChart
