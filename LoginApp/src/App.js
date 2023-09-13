import React, { useState } from 'react';
import crosspuzzle from './components/crospuzzle';
import './App.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  

  const handleLogin = async () => {
    try {
      let response = await fetch('http://127.0.0.1:8000/login/');
      let data = await response.json();
      
      const matchingUser = data.find((user) => user.email === email && user.password === password);
      

      if (matchingUser) {
        setIsLoggedIn(true);
        
      } else {
        setMessage('Authentication failed');
      }
    } catch (error) {
      setMessage('Authentication failed');
    }
  };
  if (isLoggedIn) {
    return <Crossword />;
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;