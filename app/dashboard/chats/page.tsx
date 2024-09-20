'use client';
import withAuth from '../../middlewares/withAuth'; // ajuste o caminho conforme necessário
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import SideChats from '../../components/chats/sideChats'
import ChatHeader from '@/app/components/chats/headerChat';
import ChatPage from '@/app/components/chats/chat';
interface Props{
    params: {chat: string};
}
function ChatsPage({params}: Props) {
    const chatId = params.chat; // Aqui pegamos o ID do chat da URL
    
    return (
      <div className='flex justify-between'>
      <div className='flex'>
          <h2>{params.chat}</h2>
          <SideChats />
      </div>
      <div className="flex-grow">
          {/* Verifica se o parâmetro 'chat' foi passado */}
          {chatId ? (
              <ChatPage idchat={chatId} />
          ) : (
              <div className="flex items-center justify-center h-full">
                  <h2 className="text-xl text-gray-500">Nenhuma conversa selecionada</h2>
              </div>
          )}
      </div>
  </div>
    )
}

export default withAuth(ChatsPage)