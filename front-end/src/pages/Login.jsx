import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';


const Login = () => {

  const [form, setForm] = useState({ email: '', password: '' });

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      login(res.data);

      toast.success('Logged in successfully!');

      navigate('/');
    } 
    catch (err) 
    {
      toast.error(err.response?.data?.message || 'Login failed. Check credentials.');
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-tr from-blue-200 via-blue-100 to-white flex items-center justify-center px-4">
     
      <div className="w-full max-w-md bg-white p-8 shadow-xl rounded-xl">
       
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>

        </form>
       
        <p className="mt-6 text-center text-gray-600 text-sm">
            
          Not a user?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
