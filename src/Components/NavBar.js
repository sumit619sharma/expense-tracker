import React, { useContext } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
//import CartContext from '../store/cart-context'
import {NavLink, useNavigate} from 'react-router-dom'
import { authAction } from '../redux-store/auth-reducer';
//import AuthContext from '../store/auth-context'
import { expenseAction } from '../redux-store/expense-reducer';
const NavBar = (props) => {
    
       const navigate = useNavigate();
     const dispatch = useDispatch();
       
    const onLogOut = () =>{
    
    dispatch(authAction.onLogOut());
      navigate('/login');
    }
    const emailExist = useSelector(state=> state.auth.userDetail.email) || null;
  console.log('emailExist',emailExist);

  const maxRowPage = (e)=>{
    console.log('value==',e.target.value)
    localStorage.setItem('row',e.target.value)
    dispatch(expenseAction.onRowChange());

  }

    return (
    <Navbar  fixed='top'   bg="light" className="bg-body-tertiary">
    <Container >
      <Navbar.Brand >Expense-Tracker</Navbar.Brand>
      <select  onChange={maxRowPage} >
        <option label="Show 5 rows" >5</option>
        <option label="Show 10 rows" >10</option>
        <option label="Show 20 rows" >20</option>
        <option label="Show 50 rows" >50</option>
      </select>
     <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
      {emailExist && <Button variant="outline-success"  onClick={onLogOut} >LogOut</Button>}
        
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar
