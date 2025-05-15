// frontend/src/App.jsx
import { useState } from 'react';
import axios from 'axios';
import UserList from './UserList';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin 
      ? 'http://localhost:5000/api/login'
      : 'http://localhost:5000/api/register';
    
    try {
      const res = await axios.post(url, formData);
      alert(isLogin ? 'Login successful!' : 'Registration successful!');
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        
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
        
        <button type="submit">
          {isLogin ? 'Login' : 'Register'}
        </button>
        
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </form>

      <UserList />
    </div>
  );
}

export default App;