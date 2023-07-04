import React, { useState } from 'react';
import './Profile.css'; // Import the CSS file for styling

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    profileUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(formData); // Perform update logic or API call here
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
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        
        </div>
        <div className="form-group">
        <img src="" alt="Profile URL" className="field-image" />
          <label>Profile URL</label>
          <input
            type="text"
            name="profileUrl"
            value={formData.profileUrl}
            onChange={handleChange}
            placeholder="Enter your profile URL"
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
