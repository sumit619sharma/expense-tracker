import React, { useContext, useState, } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { authAction } from '../redux-store/auth-reducer';
//import AuthContext from '../store/auth-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
      const navigation =  useNavigate();
      const dispatch = useDispatch();
      const emailExist = useSelector(state=> state.auth.userDetail.email  ) ;
      
   //const authCtx= useContext(AuthContext);
  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

const getUserLogin = async (userDetail) =>{
  
  try {
    const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4Old42pkOxqkr1jsyq_dYLAFonOwLHJ4',{
      method: 'POST',
      body: JSON.stringify(userDetail),
       headers: {
        'Content-Type': 'application/json',
       }   
    })
        if(!resp.ok){
         // setError(true);
          const err=await resp.json();
          console.log("response with error",err);
            //  return err.error.message;
        }

    const res = await resp.json();
    const passData = {idToken: res.idToken,email: res.email}
   console.log('use details onLogin',res);
   dispatch( authAction.onLogIn({data: passData}));
    return res;  
  } catch (err) {
    console.log("request failed", err);
    // return err.error.message;
  }
  
}

  const handleSubmit =async (e) => {
    e.preventDefault();
       setError(false);
    const detail = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  const resp=   await getUserLogin(detail);
  // console.log("inside check",resp)
  console.log( "emailExist==", emailExist)
    if(!resp.email){
      setError(true);
      return;
    }
   
  // authCtx.onLogIn(resp.idToken,resp.email);
  // localStorage.setItem('email',resp.email);
  // localStorage.setItem('token',resp.idToken); 
  navigation('/welcome');
    
  };

  return (
    <Container  style={{marginTop: '15%'}} >
   
   <Card>
        <Card.Body>
          <Card.Title>Login:</Card.Title>
          <div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="email"
            id="username"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <div>{"failed to login"}</div>}
        <button type="submit">Login</button>
        <div>
          <Link to='/forgot'>forgott password?</Link>
        </div>
      </form>
    </div>
                
        </Card.Body>
      </Card>
   

    </Container>
  );
};

export default Login;
