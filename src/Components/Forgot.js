import axios from 'axios';
import React, { useState } from 'react'
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
    const [error, setError] = useState(false);
    const [email , setEmail] = useState('');
   const navigate = useNavigate();
    const sendForgotPasswordRequest = async (email, apiKey) => {
      console.log(email, apiKey);
       // const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
         
        const payload = {
          requestType: 'PASSWORD_RESET',
          email: email
        };
      
        try {
          const response = await axios.post('http://localhost:3000/password/forgotpassword',{email})
         console.log("forgot response==",response)
          if (!response.ok) {
            setError(true);
            return response;
        
          }

      return await response.json();
        
        } catch (error) {
         return error
        
        }
      };
      const handleSubmit =async (e) => {
        e.preventDefault();
           setError(false);
         const api = 'AIzaSyA4Old42pkOxqkr1jsyq_dYLAFonOwLHJ4'
        const resp = await sendForgotPasswordRequest(email,api)
      // console.log("inside check",resp)
      console.log('resp',resp);
        // if(!resp.email){
        //     setError(true);
        //    return;
        // }
        // console.log( "login===", resp)
     
         navigate('/login');
        
      };

  return (
    <Container  style={{marginTop: '15%'}} >
   
    <Card>
         <Card.Body>
           <Card.Title>change Password:</Card.Title>
           <div>
       
       <form onSubmit={handleSubmit}>
           <div>
           <label htmlFor="email">Email:</label>
           <input
             type="email"
             id="email"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
           />
         </div>
         {error && <div>{"failed to change"}</div>}
         <button type="submit">change Password</button>
         
       </form>
     </div>
                 
         </Card.Body>
       </Card>
    
 
     </Container>
  )
}

export default Forgot
