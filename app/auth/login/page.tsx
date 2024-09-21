'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios'; // Import   
import Cookies from 'js-cookie';
import Image from 'next/image';

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

      const response = await axios.post('https://getluvia.com.br:3005/auth/login',   
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
    <div className="h-screen w-full flex items-center justify-center bg-[#030712]">
  <div className="p-14 w-full max-w-md bg-[#0f131e] rounded-lg shadow-lg border border-transparent">
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <Image
        src="/logowhite.png"
        alt="Logo"
        width={130}
        height={130}
        className="mb-2" // Espaçamento abaixo da imagem
      />
            <p  className='text-gray-400 pb-6' >Entre com seu Email e Senha</p>

      <div className="mb-8 relative w-full">
        <Input
          className="bg-transparent border-0 pb-2 w-full text-white text-lg placeholder-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="absolute bottom-0 left-0 w-full border-b-2 border-gray-300"></div>
      </div>
      <div className="mb-6 relative w-full">
        <Input
          className="bg-transparent border-0 pb-2 w-full text-white text-lg placeholder-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
          placeholder="Senha"
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