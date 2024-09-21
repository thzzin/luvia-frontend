"use client";
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"; // Para redirecionamento
import { ScrollArea } from "@/components/ui/scroll-area"

import axios from 'axios';
import Cookies from 'js-cookie';

import ChatHeader from "./headerChat";
interface Props{
    params: {chat: string};
}
// Componente para mensagens enviadas
function MessageSent({ content, timestamp }) {
  return (
    <div className="flex justify-end mb-4 mr-4">
      <div className="bg-[#DB636F] text-white p-4 rounded-lg max-w-xs">
        <p>{content}</p>
        <span className="text-xs text-gray-200">{timestamp}</span>
      </div>
    </div>
  );
}

// Componente para mensagens recebidas
function MessageReceived({ content, timestamp }) {
  return (
    <div className="flex justify-start mb-4 ml-4">
      <div className="bg-gray-300 text-black p-4 rounded-lg max-w-xs">
        <p>{content}</p>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
    </div>
  );
}

// Componente principal da página de chat
export default function ChatPage({ idchat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const newMsg = {
    content: newMessage,
    conversation_id: idchat,  
    message_type: 1,  
    status: "sent",
  };
  useEffect(() => {
    const searchChat = async () => {
      try {
        const response = await axios.get(
          `https://getluvia.com.br:3005/user/conversa/${idchat}`, 
          {
            headers: {
              authorization: `${Cookies.get('token')}`, 
            },
          }
        );
  
        const chatData = response.data; 
        const formattedMessages = chatData.mensagens.map((msg) => ({
          id: msg.id,
          type: msg.type, // "sent" ou "received"
          content: msg.content,
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }));
        
        setAvatar(chatData.contatoThumbnail);
        setName(chatData.contatoName);
        setPhone(chatData.contatoPhone);
        setMessages(formattedMessages); 
      } catch (error) {
        console.error("Erro ao obter mensagens do chat:", error);
      }
    };
  
    searchChat();
  }, [idchat]);
  
  console.log(avatar, name, phone)

  const handleSendMessage = async () => {
    const response = await axios.post(
      'https://getluvia.com.br:3005/user/addmsg',  
      newMsg,  
      {
        headers: {
          authorization: `${Cookies.get('token')}`,  
        },
      }
    );

    setMessages([...messages, {
      id: response.data.id,  
      type: "sent",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    }]);

    setNewMessage(""); 
  };

  return (
    <div className="flex flex-col h-screen max-h-[93vh]">
    <ChatHeader avatar={avatar} name={name} phone={phone} />

    <ScrollArea>
    <div className="flex-grow p-4 overflow-y-auto max-h-85">
        <div className="flex flex-col gap-4">
            {messages.length > 0 ? (
                messages.map((message) =>
                    message.type === "sent" ? (
                        <MessageSent key={message.id} content={message.content} timestamp={message.timestamp} />
                    ) : (
                        <MessageReceived key={message.id} content={message.content} timestamp={message.timestamp} />
                    )
                )
            ) : (
                <p>Nenhuma mensagem encontrada</p>
            )}
        </div>
    </div>
    </ScrollArea>
    <div className="p-4 border-t flex items-center gap-2">
        <Input
            className="flex-grow py-6"
            placeholder="Digite sua mensagem"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage}>Enviar</Button>
    </div>
</div>

  );
}
