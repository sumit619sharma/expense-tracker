import React, { useEffect, useState } from 'react';
import './Profile.css'; // Import the CSS file for styling

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    profileUrl: ''
  });

  console.log(':after  of after====',formData)
  useEffect(()=>{
    getProfile();
  },[]);

 // const token = localStorage.getItem('email');
 // console.log('token===',token);

  const getProfile =async ()  => {
    const uniqueId = localStorage.getItem('uniqueId');
    console.log("rspid in getProfile=",uniqueId)
    try {
     
     const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/profile.json`)
      if(!resp.ok){
       throw new Error('Request Failed');
       
      }

      const result =await resp.json();
      console.log("get profile==", result );
    setFormData({
        name:   result[uniqueId].name || '',
        profileUrl: result[uniqueId].profileUrl || ''
    })
    console.log(':formData after',formData);

    } catch (error) {
     console.log("failed to Post=",error);
    }
}

  const addToCartCrud =async (cartItem)  => {
    try {
     
     const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/profile.json?`,{
       method:'POST',
       body: JSON.stringify(cartItem),
       headers:{
         'Content-Type': 'application/json'
       }
      })
      if(!resp.ok){
       throw new Error('Request Failed');
      }
      const resArr =await resp.json();
      console.log('respid===',resArr);
    return resArr;

    } catch (error) {
     console.log("failed to Post=",error);
    }
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

  };

  const handleUpdate =async (e) => {
    e.preventDefault();
    console.log(formData); // Perform update logic or API call here
  
   const uniqueId= await addToCartCrud(formData);
   localStorage.setItem('uniqueId',uniqueId.name);
    await getProfile();




};

  const handleCancel = () => {
    setFormData({
      name: '',
      profileUrl: ''
    });
  };



  return (
    <div  style={{marginTop:'10%'}} className="profile-container">
      <h2 style={{color:'black'}} >Profile</h2>
      <form className="profile-form">
        <div className="form-group">
        <img src="" alt="Name" className="field-image" />
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={ formData.name}
            onChange={handleChange}
            
            required
          />
        
        </div>
        <div className="form-group">
        <img src="" alt="Profile URL" className="field-image" />
          <label>Profile URL</label>
          <input
            type="text"
            name="profileUrl"
            value={ formData.profileUrl}
            onChange={handleChange}
              
            required
          />
       
        </div>
        <div className="buttons-container">
          <button type="submit" onClick={handleUpdate}>Update</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
