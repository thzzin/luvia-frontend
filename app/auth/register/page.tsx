'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios'; // Import   
 axios

export default function Component() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();   


    try {
      const response = await axios.post('http://157.173.107.5/3005/auth/register',   
 {
        email,
        username,
        password,
      });

      console.log('Registration successful:', response.data);
      // Handle successful registration (e.g., redirect, show a message)
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle registration error (e.g., show an error message)
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/db.png')" }}>
      <div className="p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold text-white mb-16 text-start">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8 relative">
            <Input
              className="bg-transparent border-0 pb-2 w-full text-lg placeholder-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Email"
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="absolute bottom-0 left-0 w-full border-b-2 border-gray-300"></div>
          </div>
          <div className="mb-8 relative">
            <Input
              className="bg-transparent border-0 pb-2 w-full text-lg placeholder-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Username"
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="absolute bottom-0 left-0 w-full border-b-2 border-gray-300"></div>
          </div>
          <div className="mb-6 relative">
            <Input
              className="bg-transparent border-0 pb-2 w-full text-lg placeholder-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute bottom-0 left-0 w-full border-b-2 border-gray-300"></div>
          </div>
          <Button variant="outline" className="w-full py-2 my-8 text-lg">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}