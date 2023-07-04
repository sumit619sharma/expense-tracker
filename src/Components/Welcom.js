import React from 'react'
import { Link } from 'react-router-dom';

const Welcom = () => {
  return (
    <div style={{color: 'black' , display: 'flex' , justifyContent:'space-between'}}>
    <div> welcome to expense tracker</div> 
      <div>profile is incomplete.<Link to='/profile' >Complete Now</Link> </div>
    </div>
  )
}

export default Welcom;
