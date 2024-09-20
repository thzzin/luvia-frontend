'use client';
import { useState } from 'react';

import withAuth from '../../middlewares/withAuth'; // ajuste o caminho conforme necessário
import Chats from '@/app/components/home/graficos/chats';
import FinallyTotal from '@/app/components/home/graficos/finallyTotal';
import NewsTotal from '@/app/components/home/graficos/newschats';
import ChartChats from '@/app/components/home/graficos/newschatsgraph';
import Rate from '@/app/components/home/graficos/stars';
import NewsClientes from '@/app/components/home/graficos/newsClientes';
import Clients from '@/app/components/home/graficos/clients';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Cookies from 'js-cookie';

function HomeComponent() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/user/numero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${Cookies.get('token')}`,

        },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Número enviado com sucesso:', data);
        // Limpar o input após o envio bem-sucedido
        setPhoneNumber('');
      } else {
        console.error('Erro ao enviar o número:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };
  return (
    <div className="">
      <div className="mx-6 mt-6">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Digite o número de telefone"
            className="p-2 border rounded mr-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    <Card className='flex p-4 justify-around mx-6'>
      <FinallyTotal />
      <NewsTotal />
      <Rate />
      <NewsClientes />
      </Card>
    <div className='flex mt-6 mx-2'> {/* Ajustando para um layout flexível */}
      <div className="flex-[6] p-4"> {/* 80% para o componente Chats */}
        <Chats />
      </div>
      <div className="flex-[4] p-4"> {/* 20% para o componente ChartChats */}
        <ChartChats />
      </div>
    </div>
    <div className='mx-6 mt-6'>
    <Clients />
    </div>
  </div>
  );
}

export default withAuth(HomeComponent);
