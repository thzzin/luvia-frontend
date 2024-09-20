'use client';
import withAuth from '../../../middlewares/withAuth'; // ajuste o caminho conforme necessário


import SideChats from '../../../components/chats/sideChats'
import ChatHeader from '@/app/components/chats/headerChat';
import ChatPage from '@/app/components/chats/chat';
interface Props{
    params: {chat: string};
}
function ChatsPage({params}: Props) {
    const chatId = params.chat; // Aqui pegamos o ID do chat da URL
    
    return (
        <div className='flex justify-between'>
            <div className='flex '>
                <SideChats />
            </div>
            <div className="flex-grow">
        {chatId ? (
          <ChatPage idchat={chatId} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-xl text-gray-500">Nenhuma conversa selecionada</h2>
          </div>
        )}
      </div>        </div>
    )
}

export default withAuth(ChatsPage)