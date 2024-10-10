'use client';
import withAuth from '../../middlewares/withAuth';
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
import { Search, ArrowDownToLine } from "lucide-react";
import AddContact from '@/app/components/contato/addContact';
import EditContactPopover from '@/app/components/contato/EditContactPopover';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Trash } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner" 

const PAGE_SIZE_OPTIONS = [5, 10, 15, 25, 50, 100, 500];
const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[0];

function ContatoPage() {
    const [chats, setChats] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'https://getluvia.com.br:3005/user/contato',
                {
                    headers: {
                        authorization: `${Cookies.get('token')}`,
                    },
                }
            );
            const sortedContacts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setChats(sortedContacts);
        setTotal(sortedContacts.length);
        } catch (error) {
            console.error('Erro ao obter contatos:', error);
        }
    };

    const toastUsuarios = () =>{
         toast('Usuario Adicionado!', {
          action: {
            label: "Ok",
            onClick: () => console.log("Undo"),
          }
        });
    }

    const handleContactUpdated = async () => {
    try {
        const response = await axios.get(
            'https://getluvia.com.br:3005/user/contato',
            {
                headers: {
                    authorization: `${Cookies.get('token')}`,
                },
            }
        );

        // Ordena os contatos pela data de criação (mais recente primeiro)
        const sortedContacts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setChats(sortedContacts);
        setTotal(sortedContacts.length);
    } catch (error) {
        console.error('Erro ao obter contatos:', error);
    }
};

    const exportToCSV = () => {
        const headers = ['Nome', 'Email', 'Telefone', 'Data'];
        const csvRows = [
            headers.join(','),
            ...chats.map(chat => [
                `"${chat.name}"`,
                `"${chat.email || 'N/A'}"`,
                `"${chat.phone_number}"`,
                `"${new Date(chat.createdAt).toLocaleDateString('pt-BR')}"`
            ].join(',')),
        ];

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contatos.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleContactAdded = () => {
        fetchData();
        
    };

    const handleDeleteContato = async (phone_number) => {

        try {
            await axios.delete(`https://getluvia.com.br:3005/user/contato`, {
                headers: {
                    authorization: `${Cookies.get('token')}`,
                },
                data: { id: phone_number },
            });

            await fetchData(); // Atualiza a lista após a exclusão
        } catch (error) {
            console.error("Erro ao excluir contato:", error);
            alert('Erro ao excluir contato.');
        }
    };

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.phone_number.includes(searchQuery)
    );

    const totalFiltered = filteredChats.length;
    const totalPages = Math.ceil(totalFiltered / pageSize);
    const paginatedChats = filteredChats.slice((currentPage - 1) * pageSize, Math.min(currentPage * pageSize, totalFiltered));

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 4);
    const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div>
            <h1 className='pt-2 pb-6'>Contatos</h1>
            <h2 className='text-lg font-semibold'>Lista de Contatos</h2>
            <p>Gerencie seus contatos aqui.</p>

            <div className='flex justify-start mb-6 mt-8'>
                <div className="relative w-1/6 items-center">
                    <Input
                        className="pl-14 mr-12 py-4"
                        placeholder="Pesquisar"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <div className='pl-4'>
                    <AddContact addContato={toastUsuarios} onContactAdded={handleContactAdded} />
                </div>
                <div className='pl-4'>
                    <Button onClick={exportToCSV}>
                        <ArrowDownToLine className="mr-2 h-4 w-4" />
                        Exportar Contatos
                    </Button>
                </div>
            </div>

            <Card className='w-full max-w-[80vw] mt-4 ml-0'>
                <CardContent>
                    <Table className='mt-2'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Contato</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>Criado em</TableHead>
                                <TableHead>Última interação</TableHead>
                                <TableHead className='text-center'>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedChats.map((chat, index) => {
                                const itemIndex = (currentPage - 1) * pageSize + index + 1;
                                return (
                                    <TableRow key={chat.id}>
                                        <TableCell>{itemIndex}</TableCell>
                                        <TableCell className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarImage src={chat.thumbnail || 'https://via.placeholder.com/40'} alt={chat.name} />
                                                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{chat.name}</span>
                                        </TableCell>
                                        <TableCell>{chat.email || 'N/A'}</TableCell>
                                        <TableCell>{chat.phone_number}</TableCell>
                                        <TableCell>{new Date(chat.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                                        <TableCell>*</TableCell>
                                        <TableCell className="flex justify-center space-x-2">
                                            <EditContactPopover onContactUpdated={handleContactUpdated} contact={chat} />
                                            <Button variant="destructive" onClick={() => handleDeleteContato(chat.phone_number)}>
                                                <Trash className="mr-2 h-4 w-4" />Excluir
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className='flex justify-center items-center'>
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1 || totalPages === 1}
                                    />
                                </PaginationItem>
                                {pagesToShow.map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            onClick={() => handlePageChange(page)}
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {totalPages > endPage && <PaginationEllipsis />}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages || totalPages === 1}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                    <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={`${pageSize} por página`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Linhas por página</SelectLabel>
                                {PAGE_SIZE_OPTIONS.map(size => (
                                    <SelectItem key={size} value={size.toString()}>{size} por página</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <span className='pl-6'>{totalFiltered} {totalFiltered === 1 ? 'contato' : 'contatos'} encontrados</span>
                </CardFooter>
            </Card>
        </div>
    );
}

export default withAuth(ContatoPage);
