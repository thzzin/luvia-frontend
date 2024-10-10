'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [labelColor, setLabelColor] = useState(colorOptions[0].value);
  const [labels, setLabels] = useState([]);
  const [deleteLabelId, setDeleteLabelId] = useState(null); // Estado para armazenar o ID da etiqueta a ser excluída

  useEffect(() => {
    loadLabels();
  }, []);

  const loadLabels = async () => {
    try {
      const response = await axios.get(
        `https://getluvia.com.br:3005/user/etiqueta`,
        {
          headers: {
            authorization: `${Cookies.get('token')}`,
          },
        }
      );
      setLabels(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao carregar etiquetas:", error);
      setLabels([]);
    }
  };

  const handleAddLabel = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://getluvia.com.br:3005/user/etiqueta', { name: labelName, color: labelColor }, {
        headers: {
          authorization: `${Cookies.get('token')}`,
        },
      });
      resetForm();
      loadLabels();
    } catch (error) {
      console.error("Erro ao criar etiqueta:", error);
    }
  };

  const handleDeleteLabel = async () => {
    if (deleteLabelId) {
      try {
        await axios.delete(`https://getluvia.com.br:3005/user/deleteetiqueta`, {
          headers: {
            authorization: `${Cookies.get('token')}`,
          },
          data: { etiquetaid: deleteLabelId },
        });
        setLabels((prevLabels) => prevLabels.filter((label) => label.id !== deleteLabelId));
        setDeleteLabelId(null); // Reseta o ID após a exclusão
      } catch (error) {
        console.error("Erro ao excluir etiqueta:", error);
      }
    }
  };

  const resetForm = () => {
    setLabelName("");
    setLabelColor(colorOptions[0].value);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className='py-4 px-8'>
        <h1 className="text-2xl font-bold mb-4 pb-8">Etiquetas</h1>

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
            {labels.length > 0 ? (
              labels.map((label) => (
                <TableRow key={label.id}>
                  <TableCell className="text-center">{label.name}</TableCell>
                  <TableCell className="text-center">
                    <span style={{ backgroundColor: label.color }} className="inline-block w-4 h-4 rounded-full"></span>
                  </TableCell>
                  <TableCell className="flex justify-center space-x-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" onClick={() => setDeleteLabelId(label.id)}>Excluir</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setDeleteLabelId(null)}>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteLabel}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3" className="text-center">Nenhuma etiqueta encontrada</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default LabelsPage;
