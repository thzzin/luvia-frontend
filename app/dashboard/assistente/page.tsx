"use client";

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster"
import axios from 'axios';
import Cookies from 'js-cookie';
import { useToast } from "@/hooks/use-toast"

const AssistantsPage = () => {
  const [nome, setNome] = useState('');
  const [prompt, setPrompt] = useState('');
  const [arquivos, setArquivos] = useState([]);
  const [assistenteExistente, setAssistenteExistente] = useState(null);
  const { toast } = useToast()

  const loadAssistente = async (id) => {
    try {
      const response = await axios.get(`https://getluvia.com.br:3005/user/assistente/${id}`, {
        headers: {
          authorization: `${Cookies.get('token')}`,
        },
      });
      setAssistenteExistente(response.data);
      setNome(response.data.nome);
      setPrompt(response.data.prompt);
      setArquivos(
        response.data.arquivos.map(arquivo => ({
          file: arquivo.file,
          chunk_size: arquivo.chunk_size || '',
          chunk_overlap: arquivo.chunk_overlap || ''
        }))
      );
    } catch (err) {
      console.error('Erro ao carregar assistente:', err);
      toast.error ? toast.error('Não foi possível carregar o assistente.') : console.log('Erro ao carregar assistente.');
    }
  };

  useEffect(() => {
    const id = 'id-do-assistente';
    if (id) {
      loadAssistente(id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const arquivosComConfiguracoes = arquivos.map(arquivo => ({
        file: arquivo.file,
        chunk_size: arquivo.chunk_size,
        chunk_overlap: arquivo.chunk_overlap,
      }));

      if (assistenteExistente) {
        await axios.put(`https://getluvia.com.br:3005/user/assistente/${assistenteExistente.id}`, {
          nome,
          prompt,
          arquivos: arquivosComConfiguracoes,
        }, {
          headers: { authorization: `${Cookies.get('token')}` },
        });
        toast.success ? toast.success('Assistente atualizado com sucesso!') : console.log('Assistente atualizado com sucesso!');
      } else {
        await axios.post('https://getluvia.com.br:3005/user/assistente', {
          nome,
          prompt,
          arquivos: arquivosComConfiguracoes,
        }, {
          headers: { authorization: `${Cookies.get('token')}` },
        });
        toast.success ? toast.success('Assistente criado com sucesso!') : console.log('Assistente criado com sucesso!');
      }

      setNome('');
      setPrompt('');
      setArquivos([]);
    } catch (error) {
      console.error('Erro ao criar ou atualizar assistente:', error);
      toast.error ? toast.error('Erro ao criar ou atualizar assistente.') : console.log('Erro ao criar ou atualizar assistente.');
    }
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files).map(file => ({
      file,
      chunk_size: '',
      chunk_overlap: '',
    }));
    setArquivos(prevArquivos => [...prevArquivos, ...filesArray]);
  };

  const handleChunkConfigChange = (index, field, value) => {
    const updatedArquivos = [...arquivos];
    updatedArquivos[index][field] = value;
    setArquivos(updatedArquivos);
  };

  const handleRemoveFile = (index) => {
    const updatedArquivos = arquivos.filter((_, i) => i !== index);
    setArquivos(updatedArquivos);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{assistenteExistente ? 'Editar Assistente' : 'Criar Assistente'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="nome">Nome do Assistente</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Digite o nome do assistente"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                placeholder="Digite o prompt do assistente"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="arquivos">Adicionar Arquivos</Label>
              <Input
                id="arquivos"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </div>
            {arquivos.map((arquivo, index) => (
              <Card key={index} className="mb-2">
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">{arquivo.file.name}</span>
                    <Input
                      type="number"
                      value={arquivo.chunk_size}
                      onChange={(e) => handleChunkConfigChange(index, 'chunk_size', e.target.value)}
                      placeholder="Chunk Size"
                      className="w-24"
                    />
                    <Input
                      type="number"
                      value={arquivo.chunk_overlap}
                      onChange={(e) => handleChunkConfigChange(index, 'chunk_overlap', e.target.value)}
                      placeholder="Chunk Overlap"
                      className="w-24 ml-2"
                    />
                  </div>
                  <Button type="button" onClick={() => handleRemoveFile(index)} className="ml-2">
                    <Trash2 size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button type="submit" className="mt-4">
              {assistenteExistente ? 'Atualizar Assistente' : 'Criar Assistente'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssistantsPage;
