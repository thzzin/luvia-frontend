"use client"

import ChatsSide from "./chatsSide"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, useEffect } from 'react';

import axios from 'axios'
import Cookies from 'js-cookie';
export default function SideChats() {
    const [chats, setChats] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://157.173.107.5/3005/user/conversation',
                    {
                        headers: {
                            authorization: `${Cookies.get('token')}`,
                        },
                    }
                );

                const res = response.data;
                //const chats = res.pageInfo
                setChats(res);
            } catch (error) {
                console.error('Erro ao obter SideChats:', error);
            }
        };

        fetchData();
    }, []);
    return(
        <div className="h-[90vh] border-r-2 pr-6">
            <div >
            <h2 className="pb-6">Conversas</h2>

            <div className="relative w-full items-center">
  <Input className="pl-14 mr-12 py-6" placeholder="Pesquisar" />
  <Search className="absolute left-0 top-2 m-2.5 h-4 w-4 text-muted-foreground oy"/>
</div>

            </div>
            <div  className="w-full" >
            <ChatsSide chats={chats} />
            </div>
        </div>
    )
}

