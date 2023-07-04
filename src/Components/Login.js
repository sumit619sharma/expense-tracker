import React, { useContext, useState, } from 'react';
import { Card, Container } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
//import AuthContext from '../store/auth-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
      const navigation =  useNavigate();
   //const authCtx= useContext(AuthContext);
  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

const addUserToFirebase = async (userDetail) =>{
  
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
         
          
          return err.error.message;
        }
//setError(false);
    const res = await resp.json();
   
    return res;  
  } catch (err) {
  
    return err.error.message;
  }
  
}

  const handleSubmit =async (e) => {
    e.preventDefault();
       
    const detail = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    const resp = await addUserToFirebase(detail);
  // console.log("inside check",resp)
    if(!resp.idToken){
      setError(resp);
      return;
    }
    console.log( "login===", resp)
  // authCtx.onLogIn(resp.idToken,resp.email);
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
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
                
        </Card.Body>
      </Card>
   

    </Container>
  );
};

export default Login;
