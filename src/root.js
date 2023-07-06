import React from 'react';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import {BrowserRouter, Routes,Route,  Router,Navigate  } from 'react-router-dom'
import Welcom from './Components/Welcom';
import Profile from './Components/Profile';
import NavBar from './Components/NavBar';
import Forgot from './Components/Forgot';
import CartProvider from './store/CartProvider';
import {  useSelector } from 'react-redux';
import './App.css';

const Root = () => {
    const emailExist =  useSelector(state=> state.auth.userDetail.email)
    const theme =  useSelector(state=> state.theme.theme)
   
  return  <div className={`app ${theme}`} > 
   <CartProvider>
      <BrowserRouter>
      <NavBar/>
   <Routes>
  <Route path='/' element={<SignUp/> }/>
  <Route path='/login' element={<Login/> }/>
   <Route path='/welcome' element={<Welcom />} />
      <Route path='/profile' element={<Profile/> }/>
  <Route path='/forgot' element={<Forgot/> }/>
  <Route path='/*' element={<SignUp/> }/>
   </Routes>
  </BrowserRouter>
      </CartProvider>
      </div>
}
export default Root;