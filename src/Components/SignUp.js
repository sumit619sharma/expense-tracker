import React, { useState } from 'react';
import './SignUp.css'; // Import the CSS file for styling
import { Link , useNavigate} from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const addUserToFirebase = async (userDetail) =>{
  
    try {
      const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4Old42pkOxqkr1jsyq_dYLAFonOwLHJ4',{
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
          }));
    
    
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setError(false);

    console.log(formData); // Perform signup logic or API call here
     if(formData.password!=formData.confirm){
        setError("password is not matched");
        return;
     }
    

    const detail = {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      }
      const resp = await addUserToFirebase(detail);
    // console.log("inside check",resp)
      if(!resp.idToken){
        setError(resp);
        return;
      }
      console.log( "login===", resp)
      navigate('/login');
    
    setFormData({
      email: '',
      password: '',
      confirm: '',
    });
  };

  return (
    <div  style={{marginTop: '5%' ,alignContent:'centre'}} className="signup-container">
      <h2 style={{color: 'black'}} >Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirm"
          placeholder="confirm password"
          value={formData.confirm}
          onChange={handleChange}
          required
        />
          {error && <div>{ error}</div>}
        <button type="submit">Sign Up</button>

        <div>
            already have an account? <Link to='/login' >login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
