import React, { useContext } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
//import CartContext from '../store/cart-context'
import {NavLink, useNavigate} from 'react-router-dom'
//import AuthContext from '../store/auth-context'

const NavBar = (props) => {
    // const cartCtx = useContext(CartContext);
    // const qty =  Object.keys(cartCtx.quantity).length || 0;
    // const authCtx = useContext(AuthContext);
    // const showCart  =()=>{
    //   if(authCtx.isloggedIn){
    //     props.onClick();
    //   }
    // } 
       const navigate = useNavigate();
  const email = localStorage.getItem('email');
    const onLogOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
      navigate('/login');
    }

  return (
    <Navbar  fixed='top'   bg="light" className="bg-body-tertiary">
    <Container >
      <Navbar.Brand >Expense-Tracker</Navbar.Brand>
     <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        {email && <Button variant="outline-success"  onClick={onLogOut} >LogOut</Button>}
        
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar
