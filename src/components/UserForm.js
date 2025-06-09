import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UserForm.css';

function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    gender: '',
    bio: ''
  });

  const { id } = useParams(); // destructring id from useParams
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  // Fetch user for edit
  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`).then(res => {
        setUser(res.data);
      });
    }
  }, [id]); // dependency array with id if id changes it causes re-render, if [] is passed it runs only once

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 // ...is a spread operator, it copies all the properties of user object and then we are updating the property with name e.target.name

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${id}`, user);
        alert('User updated!');
      } else {
        await axios.post('${process.env.REACT_APP_API_URL}/api/users', user);
        alert('User Created!');
      }

      setUser({
        name: '', email: '', phone: '',
        address: '', age: '', gender: '', bio: ''
      });

      navigate('/users');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit User' : 'Register User'}</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <input name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={user.address} onChange={handleChange} />
        <input name="age" placeholder="Age" type="number" value={user.age} onChange={handleChange} />
        <select name="gender" value={user.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <textarea name="bio" placeholder="Short Bio" rows={3} value={user.bio} onChange={handleChange}></textarea>
        <button type="submit">{id ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default UserForm;
