
import React from 'react'
import ChartBar from './ChartBar';
import "./Chart.css";

const Chart = (props) => {
  
  let dataPointsValue = props.dataPoints.map(dataPoint=> dataPoint.value);
  console.log("ValueArray====",dataPointsValue);
  let maxValueMonth = Math.max(...dataPointsValue);
   console.log("maxValue====", maxValueMonth);
  return (
    <div className='chart'>
        {
          props.dataPoints.map(dataPoint =>
             <ChartBar 
             key={dataPoint.label}
             value={dataPoint.value}
              maxValue={maxValueMonth}
              label={dataPoint.label} />)
        }
    </div>
  )
}

export default Chart;
