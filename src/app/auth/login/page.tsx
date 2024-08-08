// app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 const [disabled , setDisabled] = useState(false) 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true)

    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile'); // Redirect to profile or another page after login
    } catch (error) {
      console.error('Error logging in:', error);
    }
    setDisabled(false)
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
        <button disabled = {disabled} type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default Login;
