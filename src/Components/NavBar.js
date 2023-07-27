import React, { useContext } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
//import CartContext from '../store/cart-context'
import {NavLink, useNavigate} from 'react-router-dom'
import { authAction } from '../redux-store/auth-reducer';
//import AuthContext from '../store/auth-context'

const NavBar = (props) => {
    
       const navigate = useNavigate();
     const dispatch = useDispatch();
       
    const onLogOut = () =>{
    
    dispatch(authAction.onLogOut());
      navigate('/login');
    }
    const emailExist = useSelector(state=> state.auth.userDetail.email) || null;
  console.log('emailExist',emailExist);
    return (
    <Navbar  fixed='top'   bg="light" className="bg-body-tertiary">
    <Container >
      <Navbar.Brand >Expense-Tracker</Navbar.Brand>
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
