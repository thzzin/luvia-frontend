'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserRoundPlus } from "lucide-react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Toaster } from "@/components/ui/toaster"
import { toast } from "sonner" 
const AddContact = ({ onContactAdded, addContato }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [csvError, setCsvError] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === 'text/csv') {
            const formData = new FormData();
            formData.append('file', file);

            axios.post('https://getluvia.com.br:3005/user/addcsv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `${Cookies.get('token')}`,
                },
            })
            .then(() => {
                console.log('CSV enviado com sucesso!');
                if (onContactAdded) onContactAdded();
            })
            .catch((err) => {
                console.error('Erro ao enviar CSV:', err);
                setCsvError('Erro ao enviar o arquivo CSV.');
            });
        } else {
            setCsvError('Por favor, envie um arquivo CSV válido.');
        }
    };

    const handleSubmit = () => {
        const newContact = { nome: name, phone }; // Ajuste para 'nome'
        axios.post('https://getluvia.com.br:3005/user/contato', newContact, {
            headers: {
                authorization: `${Cookies.get('token')}`,
            },
        })
        .then(() => {
            console.log('Contato adicionado com sucesso!');
            addContato()
             toast('Login Realizado!', {
          action: {
            label: "Ok",
            onClick: () => console.log("Undo"),
          }
        });
            if (onContactAdded) onContactAdded();
            setName('');
            setPhone('');
            setEmail('');
        })
        .catch((error) => {
            console.error('Erro ao adicionar contato:', error);
        });
    };

    return (

        <div>
 <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline"> 
                    <UserRoundPlus className="mr-2 h-4 w-4" />
                    Adicionar Contato
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Adicionar Contato</h4>
                        <p 
                            className={`text-sm text-muted-foreground ${isDragging ? 'border-2 border-dashed border-blue-500 p-4 rounded-md' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            Arraste um arquivo CSV ou preencha:
                        </p>
                        {csvError && <p className="text-red-500 text-sm">{csvError}</p>}
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-2 h-8" />
                        </div>
                    </div>
                    <Button onClick={handleSubmit}>Adicionar</Button>
                </div>
            </PopoverContent>
        </Popover>

        </div>
       
    );
};

export default AddContact;
