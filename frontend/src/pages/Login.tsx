
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'
import back from '../assets/login.jpg' 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'zayneb' && password === '123') {
        console.log('Connexion réussie');
        navigate('/home');
      } else {
        alert('username or password incorrect');
      }
    
    
    
  };

  return (
    <div className='logcontainer'>
    <img src={back} alt="" />
 <div className="left">
 <h2>Login</h2>
  <form onSubmit={handleLogin}>
    <div>
      
      <input placeholder='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
    </div>
    <div>
      
      <input placeholder='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </div>
    <button type="submit">login</button>
  </form>
  
 </div>
</div>
  );
}

export default Login;
