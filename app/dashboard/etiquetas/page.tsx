'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const colorOptions = [
    { value: '#FF5733', label: 'Vermelho' },
    { value: '#33FF57', label: 'Verde' },
    { value: '#3357FF', label: 'Azul' },
    { value: '#F1C40F', label: 'Amarelo' },
    { value: '#8E44AD', label: 'Roxo' },
    { value: '#E67E22', label: 'Laranja' },
    { value: '#3498DB', label: 'Ciano' },
    { value: '#2ECC71', label: 'Verde Claro' },
];

const LabelsPage = () => {
    const [labelName, setLabelName] = useState("");
    const [labelColor, setLabelColor] = useState(colorOptions[0].value); // Cor padrão
    const [labels, setLabels] = useState([]);

    // Função para carregar etiquetas
    const loadLabels = async () => {
        try {
            const response = await axios.get('/api/labels', {
                headers: {
                    authorization: `${Cookies.get('token')}`,
                },
            });
            setLabels(response.data); // Define o estado com as etiquetas
        } catch (error) {
            console.error("Erro ao carregar etiquetas:", error);
        }
    };

    useEffect(() => {
        loadLabels();
    }, []);

    const handleAddLabel = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/labels', { name: labelName, color: labelColor }, {
                headers: {
                    authorization: `${Cookies.get('token')}`,
                },
            });
            setLabelName(""); // Limpa o campo de entrada
            setLabelColor(colorOptions[0].value); // Reseta a cor padrão
            loadLabels(); // Recarrega as etiquetas
        } catch (error) {
            console.error("Erro ao criar etiqueta:", error);
        }
    };

    const handleDeleteLabel = async (id) => {
        try {
            await axios.delete(`/api/labels/${id}`, {
                headers: {
                    authorization: `${Cookies.get('token')}`,
                },
            });
            loadLabels(); // Recarrega as etiquetas
        } catch (error) {
            console.error("Erro ao excluir etiqueta:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <Card className='py-4 px-8'>
                <h1 className="text-2xl font-bold mb-4 pb-8">Etiquetas</h1>

                {/* Formulário para criar etiqueta */}
                <form onSubmit={handleAddLabel} className="mb-8">
                    <Input
                        type="text"
                        placeholder="Nome da Etiqueta"
                        value={labelName}
                        onChange={(e) => setLabelName(e.target.value)}
                        className="mb-4"
                        required
                    />
                    <div className='my-4'>
                 <Select value={labelColor} onValueChange={setLabelColor}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione uma cor" />
                        </SelectTrigger>
                        <SelectContent>
                            {colorOptions.map((color) => (
                                <SelectItem key={color.value} value={color.value}>
                                    <span className="flex items-center">
                                        <span 
                                            style={{ backgroundColor: color.value }} 
                                            className="block w-4 h-4 rounded-full mr-2" 
                                        />
                                        {color.label}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    </div>
                    <Button type="submit" className="w-full bg-[#DB636F] text-white">
                        Criar Etiqueta
                    </Button>
                </form>
            </Card>

            <Card className='mt-8'>
                <Table className='my-2'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-center'>Etiqueta</TableHead>
                            <TableHead className='text-center'>Cor</TableHead>
                            <TableHead className='text-center'>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {labels.map((label) => (
                            <TableRow key={label.id}>
                                <TableCell className="">
                                    {label.name}
                                </TableCell>
                                <TableCell className="">
                                    <span style={{ backgroundColor: label.color }} className="inline-block w-4 h-4 rounded-full"></span>
                                </TableCell>
                                <TableCell className="flex justify-center space-x-2">
                                    <Button variant="outline">Editar</Button>
                                    <Button variant="outline" onClick={() => handleDeleteLabel(label.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};

export default LabelsPage;
