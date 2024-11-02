'use client';
import { useState, useEffect } from 'react';
import withAuth from '../../../middlewares/withAuth';
import SideChats from '../../../components/chats/sideChats';
import ChatHeader from '@/app/components/chats/headerChat';
import ChatPage from '@/app/components/chats/chat';

interface Props {
  params: { chat: string };
}

function ChatsPage({ params }: Props) {
  const chatId = params.chat;
  const [showChatList, setShowChatList] = useState(true);

  useEffect(() => {
    if (chatId) setShowChatList(false);
  }, [chatId]);

  return (
  <div className="flex flex-col max-h-[93vh] md:flex-row md:max-h-[90vh]">
    <div
  className={`w-full md:w-1/3 ${showChatList ? 'block' : 'hidden'} md:block`}
  style={{ maxHeight: 'calc(100vh - 64px)', overflow: 'hidden' }} // Oculta a barra de rolagem nativa
>
  <div style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 64px)', scrollbarWidth: 'none' }} className="scrollbar-hidden">
    <SideChats />
  </div>
</div>


    <div className="w-full flex-grow">
      {chatId ? (
        <ChatPage idchat={chatId} setShowChatList={setShowChatList} />
      ) : (
        // Aqui ajustamos a classe para esconder em desktop e mostrar no mobile
        <div className="flex items-center justify-center w-full h-full text-gray-500 hidden md:flex">
          <h2 className="text-xl">Nenhuma conversa selecionada</h2>
        </div>
      )}
    </div>
  </div>
);



}

export default withAuth(ChatsPage);
