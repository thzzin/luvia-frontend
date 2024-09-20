'use client';
import withAuth from '../../middlewares/withAuth'; // ajuste o caminho conforme necessário
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserRoundPlus  } from "lucide-react";

function ContatoPage() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://157.173.107.5/3005/user/contato',
                    {
                        headers: {
                            authorization: `${Cookies.get('token')}`,
                        },
                    }
                );
                const res = response.data;
                console.log('contatos', res); // Acessa o array de contatos
                setChats(res); // Define o array de contatos no estado
            } catch (error) {
                console.error('Erro ao obter contato:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className=''>
            <h2 className='pt-2 pb-6'>Meus Contatos - (total)</h2>
            <div className='flex justify-start'>
                <div className="relative w-1/6 items-center">
                    <Input className="pl-14 mr-12 py-4" placeholder="Pesquisar" />
                    <Search className="absolute left-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <div className='pl-4'>
                    <Button>
                    <UserRoundPlus className="mr-2 h-4 w-4"/> Adicionar Contato    
                    </Button>
                </div>
            </div>
            <Table className='mt-8'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Contato</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className='text-center'>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {chats.map((chat) => (
                        <TableRow key={chat.id}>
                            <TableCell className="flex items-center space-x-3">
                                <Avatar>
                                    <AvatarImage src={chat.thumbnail || 'https://via.placeholder.com/40'} alt={chat.name} />
                                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{chat.name}</span>
                            </TableCell>
                            <TableCell>{chat.email || 'N/A'}</TableCell>
                            <TableCell>{chat.phone_number}</TableCell>
                            <TableCell>{new Date(chat.created_at * 1000).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell className="flex justify-center space-x-2">
                                <Button variant="outline" color='#'>Editar</Button>
                                <Button variant="outline">Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default withAuth(ContatoPage);
