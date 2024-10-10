"use client";

import ChatsSide from "./chatsSide";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react"; // Importar o ícone "X"

export default function SideChats() {
    const [chats, setChats] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://getluvia.com.br:3005/user/conversation',
                    {
                        headers: {
                            authorization: `${Cookies.get('token')}`,
                        },
                    }
                );

                const res = response.data;
                setChats(res);
                localStorage.setItem('chats', JSON.stringify(res));
            } catch (error) {
                console.error('Erro ao obter SideChats:', error);
            }
        };

        const storedChats = localStorage.getItem('chats');
        if (storedChats) {
            setChats(JSON.parse(storedChats));
        } else {
            fetchData(); // Caso não haja chats armazenados, faça a requisição
        }
    }, []);

    const updateChats = (newChats) => {
        setChats(newChats);
        localStorage.setItem('chats', JSON.stringify(newChats));
    };

    const checkForNewMessages = async () => {
        try {
            const response = await axios.get(
                'https://getluvia.com.br:3005/user/conversation',
                {
                    headers: {
                        authorization: `${Cookies.get('token')}`,
                    },
                }
            );

            const res = response.data;
            const storedChats = JSON.parse(localStorage.getItem('chats'));

            if (JSON.stringify(res) !== JSON.stringify(storedChats)) {
                updateChats(res);
            }
        } catch (error) {
            console.error('Erro ao verificar novas mensagens:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(checkForNewMessages, 30000); // 30 segundos
        return () => clearInterval(interval); // Limpar o intervalo ao desmontar
    }, []);

    // Filtrar e ordenar chats com base no searchTerm e pela data da última mensagem
   const filteredChats = chats.filter(chat => {
    const nameMatch = chat.contatoName.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = chat.contatoPhone.includes(searchTerm);
    const contentMatch = chat.lastMessage?.content?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    return nameMatch || phoneMatch || contentMatch;
}).sort((a, b) => {
    const dateA = new Date(a.lastMessage?.createdAt || 0);
    const dateB = new Date(b.lastMessage?.createdAt || 0);
    return dateB - dateA;
});


    return (
        <div className="h-[90vh] border-r-2 pr-6 max-w-[27vw]">
            <div className="flex justify-between items-center">
                <h2 className="pb-6">Conversas ({filteredChats.length})</h2>
            </div>

            <div className="relative w-full items-center">
                <Input
                    className="pl-14 mr-12 py-6"
                    placeholder="Pesquisar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-0 top-2 m-2.5 h-4 w-4 text-muted-foreground" />

                {searchTerm && (
                    <X 
                        className="absolute right-0 top-2 m-2.5 h-4 w-4 text-muted-foreground cursor-pointer" 
                        onClick={() => setSearchTerm('')} 
                    />
                )}
            </div>

            <ScrollArea className="h-[80vh] w-full mt-6">
                <div className="w-full">
                    <ChatsSide chats={filteredChats} />
                </div>
            </ScrollArea>
        </div>
    );
}
