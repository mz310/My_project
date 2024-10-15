import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authenticate.css'; // Import the CSS file

const Authenticate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For registration
  const [isRegistered, setIsRegistered] = useState(true); // Track if registering or logging in
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []; // Get all users

    // Find the user based on email and password
    const user = existingUsers.find(user => user.email === email && user.password === password);

    if (user) {
      alert('Logged in successfully!');
      navigate(`/${user.username}/places`); // Redirect to the user's places page using username
    } else {
      alert('No account found with this email or password. Please register.');
      setIsRegistered(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Create a new user object with unique ID
    const newUser = { id: new Date().getTime(), username, email, password };
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if the user already exists based on the email
    const userExists = existingUsers.some(user => user.email === newUser.email);
    
    if (userExists) {
        alert('An account with this email already exists. Please log in.');
        return;
    }

    existingUsers.push(newUser); // Add new user to existing users
    localStorage.setItem('users', JSON.stringify(existingUsers)); // Save updated user list
    alert('Account created successfully! You can now log in.');
    setIsRegistered(true); // Switch back to login form after registration
  };

  return (
    <div className="auth-container">
      {isRegistered ? (
        <div>
          <h2>Нэвтрэх</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Имэйл" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <input 
              type="password" 
              placeholder="Нууц үг" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <button type="submit" className="btn">Нэвтрэх</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Бүртгүүлэх</h2>
          <form onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder="Нэр" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
            <input 
              type="email" 
              placeholder="Имэйл" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <input 
              type="password" 
              placeholder="Нууц үг" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <button type="submit" className="btn">Бүртгүүлэх</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authenticate;
