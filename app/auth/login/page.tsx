'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios'; // Import   
import Cookies from 'js-cookie';

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner" 
export default function Component() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:3005/auth/login',   
        {
               email,
               password,
             });

      console.log('response', response)
      if(response.status === 200){
        const { token, msg } = response.data;
        Cookies.set('token', token);
        toast('Login Realizado!', {
          action: {
            label: "Ok",
            onClick: () => console.log("Undo"),
          }
        });
        
        window.location.href = '/dashboard/chats';
      }
      // Handle successful login (e.g., redirect, store token)
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error (e.g., show an error message)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/db.png')" }}>
      <div className="p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold text-white mb-16 text-start">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8 relative">
            <Input
              className="bg-transparent border-0 pb-2 w-full text-lg placeholder-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Username"
              type='text'
              value={email}
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
            Login
          </Button>
        </form>
      </div>
      <Toaster />

    </div>
  );
}